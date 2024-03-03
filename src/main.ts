import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { temporaryDB } from './database/database';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(4000);
}
export const db = new temporaryDB();
bootstrap();
