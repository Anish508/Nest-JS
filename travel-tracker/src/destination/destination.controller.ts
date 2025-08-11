import { Body, Controller, Post, UseGuards, Request, Get, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DestinationService } from './destination.service';
import { CreateDestinationDto } from 'src/auth/dto/create-destination.dto';

@Controller('destination')
@UseGuards(JwtAuthGuard)
export class DestinationController {
      constructor(private readonly destinationService: DestinationService){}

      @Post()
      create(@Request() req, @Body() createDestinationDto:CreateDestinationDto){
            return this.destinationService.create(req.user.userId, createDestinationDto)
      }

      @Get()
      findAll(@Request() req){
            return this.destinationService.findAll(req.user.userId)
      }

      @Get(':id')
      findOne(@Request() req, @Param('id') id:string){
            return this.destinationService.findOne(req.user.id, +id)
      }
}
