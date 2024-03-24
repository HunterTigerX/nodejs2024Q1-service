import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { LoggingService } from './api/logger/logger.service';
dotenv.config();
// import swaggerJSDoc from 'swagger-jsdoc';
// import swaggerUi from 'swagger-ui-express';
// not working with import

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      logger: new LoggingService(),
    });

    const swaggerDefinition = {
      openapi: '3.0.0',
      info: {
        title: 'Home Library Service',
        version: '1.0.0',
        description: 'Home music library service',
      },
      host: `${process.env.DB_HOST}:${+process.env.PORT}`,
      basePath: '/docs',
    };

    const options = {
      swaggerDefinition,
      apis: ['doc/api.yaml'],
    };

    const swaggerSpec = swaggerJSDoc(options);

    app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(`${+process.env.PORT}`);
  } catch (error) {
    console.error('Error during app initialization:', error);
  }
}
bootstrap();
