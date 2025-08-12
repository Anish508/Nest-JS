import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { FileUploadModule } from './file-upload/file-upload.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [FileUploadModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
