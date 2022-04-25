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
     CvModule,
    SkillModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3360,
      username: 'root',
      password: '',
      database: 'cvs_nest',
      synchronize: true,
      autoLoadEntities: true,
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
