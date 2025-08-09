import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt'
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
      constructor(private prisma: PrismaService, private jwtService:JwtService) {}

      async register(registerDto: RegisterDto){
            //check if user is exist
            const {email, password} =  registerDto
            const existingUser = await this.prisma.user.findUnique({
                  where: {email}
            })
            if(existingUser){
                  throw new ConflictException('User already exists... Please try with different email')
            }
            
            //hash the pass
            const hashPass = await bcrypt.hash(password, 10)
            //create new user
            const newlyCreatedUser = await this.prisma.user.create({
                  data:{
                        email, password: hashPass
                  }
            })
            //remove pass form return project
            const {password:_, ...result} = newlyCreatedUser
            return result
      }
      async login(loginDto:LoginDto){
            const {email, password }= loginDto
            //find  the current user by email

            const user = await this.prisma.user.findUnique({
                  where: {email}
            })
            if(!user){
                  throw new UnauthorizedException("Invalid credetials... please try again!")
            }
            //verify pass
            const isPassValid = await bcrypt.compare(password, user.password)
            if(!isPassValid){
                  return new UnauthorizedException("invalid password")
            }
            const token = this.jwtService.sign({userId: user.id})

            const {password:_, ...result} = user
            return {...result, token}
      }
}
