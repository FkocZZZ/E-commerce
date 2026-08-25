import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Set global API prefix
  app.setGlobalPrefix('api');

  // Enable API versioning (e.g., /api/v1/...)
  app.enableVersioning({
    type:VersioningType.URI,
    defaultVersion: '1',
  })

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
