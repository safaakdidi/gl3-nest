import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Put,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { Todo } from './Model/todo.model';
import { TodoService } from './todo.service';
import { AddTodoDto } from './TodoDto/AddTodoDto';
import { UpdateTodoDto } from './TodoDto/UpdateTodoDto';
import { RequestDurationInterceptor } from '../interceptors/RequestDurationInterceptor';

@UseInterceptors(RequestDurationInterceptor)
@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  todos: Todo[] = [];

  @Get()
  getTodos(): Todo[] {
    // console.log(request);
    return this.todoService.getTodos();
  }

  @Post()
  addTodo(@Body() newTodo: AddTodoDto): Todo {
    return this.todoService.addTodo(newTodo);
  }

  @Get('/:id')
  getTodoById(@Param('id', ParseIntPipe) id) {
    return this.todoService.getTodoById(id);
  }

  @Delete('/:id')
  deleteTodoById(@Param('id', ParseIntPipe) id) {
    return this.todoService.deleteTodoById(id);
  }

  @Put('/:id')
  update(@Body() newTodo: UpdateTodoDto, @Param('id', ParseIntPipe) id) {
    return this.todoService.update(newTodo, id);
  }
}
