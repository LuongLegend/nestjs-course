import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { loggerMiddleware } from './middleware/loggerFn.middleware';
import { ResponseInterceptor } from './common/interceptor/response.interceptor';
import { CustomValidationPipes } from './common/pipe/custom-validation.pipe';
async function bootstrap() {
  const PORT = process.env.NODE_ENV ?? 3000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(
    new CustomValidationPipes({ transform: true, whitelist: true }),
  );
  //app.use(loggerMiddleware);
  await app.listen(PORT, () => console.log('app is running on port' + PORT));
}

bootstrap();
