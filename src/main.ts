import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import { MyFirstInterceptor } from './interceptors/MyFirstInterceptor';
import { RequestDurationInterceptor } from './interceptors/RequestDurationInterceptor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(morgan('dev'));
  // app.use(helmet());
  app.useGlobalInterceptors(new MyFirstInterceptor());
  await app.listen(3000);
}

bootstrap();
