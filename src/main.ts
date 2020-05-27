import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));
  app.setGlobalPrefix('api');
  app.enableCors();
  const options = new DocumentBuilder()
    .setTitle('Oneboard API')
    .setDescription('The oneboard API description')
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/specs', app, document);

  await app.listen(3000);
}
bootstrap();
