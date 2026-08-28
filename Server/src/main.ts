import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Set global API prefix
  app.setGlobalPrefix('api');

  // Strip out @Exclude() properties (like passwords) from all API responses
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // Enable API versioning (e.g., /api/v1/...)
  app.enableVersioning({
    type:VersioningType.URI,
    defaultVersion: '1',
  })

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
