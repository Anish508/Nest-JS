import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() //makes the modules as a globally scoped
@Module({
  //registering prisma service
  providers: [PrismaService],
  exports:[PrismaService], //this will make sure that PrismaService is availbale other modules its will be imported 
})
export class PrismaModule {}
