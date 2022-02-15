import { AddTodoDto } from './AddTodoDto';
import { TodoStatusEnum } from '../enums/todo-status.enum';
import { PartialType } from '@nestjs/swagger';

export class UpdateTodoDto extends PartialType(AddTodoDto) {
  status: TodoStatusEnum;
}
