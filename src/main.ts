import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { loggerMiddleware } from './middleware/loggerFn.middleware';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './common/interceptor/response.interceptor';
async function bootstrap() {
  const PORT = process.env.NODE_ENV ?? 3000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  //app.use(loggerMiddleware);
  await app.listen(PORT, () => console.log('app is running on port' + PORT));
}

bootstrap();
