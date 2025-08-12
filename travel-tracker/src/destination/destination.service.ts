import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateDestinationDto } from './dto/update-destination.dto';

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
      async findAll(userId: number) {
            return this.prisma.destinations.findMany({
                  where: { userId }
            })
      }
      async findOne(userId: number, id: number) {
            const destination = await this.prisma.destinations.findFirst({
                  where: { id, userId }
            })
            if (!destination) {
                  throw new NotFoundException(`Destination not found with this id ${id}`);
            }
            return destination
      }
      async removeDestination(userId: number, id: number) {
            await this.findOne(userId, id)

            return this.prisma.destinations.delete({
                  where: { id }
            })
      }
      async update(userId: number, id: number, dto: UpdateDestinationDto) {
            await this.findOne(userId, id);

            const updateData = { ...dto };

            // Convert travelDate if provided
            if (updateData.travelDate) {
                  updateData.travelDate = new Date(updateData.travelDate).toISOString();
            }

            return this.prisma.destinations.update({
                  where: { id },
                  data: updateData
            });
      }
}
