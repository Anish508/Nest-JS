import { Body, Controller, Post, UseGuards, Request, Get, Param, Patch, Delete, BadRequestException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DestinationService } from './destination.service';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { UpdateDestinationDto } from './dto/update-destination.dto';

@Controller('destination')
@UseGuards(JwtAuthGuard)
export class DestinationController {
      constructor(private readonly destinationService: DestinationService) { }

      @Post()
      create(@Request() req, @Body() createDestinationDto: CreateDestinationDto) {
            return this.destinationService.create(req.user.userId, createDestinationDto)
      }

      @Get()
      findAll(@Request() req) {
            return this.destinationService.findAll(req.user.userId)
      }

      @Get(':id')
      findOne(@Request() req, @Param('id') id: string) {
            return this.destinationService.findOne(req.user.id, +id)
      }

      @Patch(':id')
      update(
            @Request() req,
            @Param('id') id: string,
            @Body() updateDestinationDto: UpdateDestinationDto
      ) {
            if (!updateDestinationDto || Object.keys(updateDestinationDto).length === 0) {
                  throw new BadRequestException('No fields provided for update');
            }

            return this.destinationService.update(
                  req.user.userId,
                  +id,
                  updateDestinationDto
            );
      }

      @Delete(':id')
      delete(@Request() req, @Param('id') id: string,) {
            return this.destinationService.removeDestination(req.user.id, +id)
      }

}
