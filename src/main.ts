import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { temporaryDB } from './database/database';
import { noTokenPresented } from './errorsAndMessages/errors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(4000);
  app.use((req: { headers: { authorization: any } }) => {
    const token = req.headers.authorization; // Assuming the token is passed in the Authorization header
    console.log(token, 'token');
    if (!token) {
      noTokenPresented();
    }
  });
}
export const db = new temporaryDB();
bootstrap();
