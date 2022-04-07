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
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TodoEntity } from './entities/TodoEntity';
import { TimeEntity } from './entities/TimeEntity';
@Module({
  imports: [
    TodoModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3307,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      //entities: [TodoEntity, TimeEntity],
      synchronize: true,
    }),
  ],
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
