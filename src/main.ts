import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { loggerMiddleware } from './middleware/loggerFn.middleware';
async function bootstrap() {
  const PORT = process.env.NODE_ENV ?? 3000;
  const app = await NestFactory.create(AppModule);
  //app.use(loggerMiddleware);
  await app.listen(PORT, () => console.log('app is running on port' + PORT));
}

bootstrap();
