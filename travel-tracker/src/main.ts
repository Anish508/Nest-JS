import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Remove extra fields
    forbidNonWhitelisted: true, // Block unknown fields
    transform: true // Automatically convert types
  }))
  await app.listen(process.env.PORT ?? 7000);
}
bootstrap();
