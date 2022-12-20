import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT');

  app.setGlobalPrefix('api'); // http://localhost:4000/api

  const config = new DocumentBuilder()
    .setTitle('API con swagger')
    .setDescription('Aprendiendo a usar swagger para mis APIs')
    .setVersion('1.1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document); // http://localhost:4000/docs

  await app.listen(PORT);

  logger.log(`🚀 Server started on http://localhost:${PORT}`);
}
bootstrap();
