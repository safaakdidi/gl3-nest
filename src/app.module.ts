import {
  HttpException,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { logger } from './middleware/logger';
import { APP_FILTER } from '@nestjs/core';
import { CustomFilter } from './filters/CustomFilter';
@Module({
  imports: [TodoModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: CustomFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer
      .apply(logger)
      // j’accepte toutes les routes commençant par ‘courses’
      .forRoutes('todo/*');
  }
}
