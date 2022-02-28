import { AddTodoDto } from './AddTodoDto';
import { TodoStatusEnum } from '../enums/todo-status.enum';
import { PartialType } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { Optional } from '@nestjs/common';

export class UpdateTodoDto extends PartialType(AddTodoDto) {
  @Optional()
  @IsEnum(TodoStatusEnum)
  status: TodoStatusEnum;
}
