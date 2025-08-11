import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDestinationDto } from '../auth/dto/create-destination.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DestinationService {
      constructor(private prisma: PrismaService) { }

      async create(userId: number, createDestinationDto: CreateDestinationDto) {
            return this.prisma.destinations.create({
                  data: {
                        ...createDestinationDto,
                        travelDate: new Date(createDestinationDto.travelDate).toISOString(),
                        userId
                  },
            })
      }
      async findAll(userId:number){
            return this.prisma.destinations.findMany({
                  where: {userId}
            })
      }
      async findOne(userId:number, id:number){
            const destination = await this.prisma.destinations.findFirst({
                  where:{id, userId}
            })
            if(!destination){
                  throw new NotFoundException(`Destination not found with this id ${id}`);
            }
            return destination
      }
      
}
