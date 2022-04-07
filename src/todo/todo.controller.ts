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
  Version,
  Patch,
  Query,
} from '@nestjs/common';
import { Todo } from './Model/todo.model';
import { TodoService } from './todo.service';
import { AddTodoDto } from './TodoDto/AddTodoDto';
import { UpdateTodoDto } from './TodoDto/UpdateTodoDto';
import { RequestDurationInterceptor } from '../interceptors/RequestDurationInterceptor';
import { TodoEntity } from '../entities/TodoEntity';
import { TodoStatusEnum } from './enums/todo-status.enum';
import { SearchTodoDto } from './TodoDto/SearchTodoDto';
import { DateIntervalDto } from './TodoDto/date-interval.dto';

@UseInterceptors(RequestDurationInterceptor)
@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  todos: Todo[] = [];

  @Get()
  @Version('1')
  getTodos(): Todo[] {
    // console.log(request);
    return this.todoService.getTodos();
  }
  @Get()
  @Version('2')
  getBDTodos(): Promise<TodoEntity[]> {
    // console.log(request);
    return this.todoService.getBDTodos();
  }

  @Post()
  @Version('1')
  addTodo(@Body() newTodo: AddTodoDto): Todo {
    return this.todoService.addTodo(newTodo);
  }
  @Post()
  @Version('2')
  async addDBTodo(@Body() newTodo: AddTodoDto): Promise<TodoEntity> {
    return await this.todoService.addDBTodo(newTodo);
  }

  @Get('/:id')
  @Version('1')
  getTodoById(@Param('id', ParseIntPipe) id) {
    return this.todoService.getTodoById(id);
  }
  @Get('/:id')
  @Version('2')
  getBDTodoById(@Param('id', ParseIntPipe) id) {
    return this.todoService.getBDTodoById(id);
  }
  @Get('todos')
  @Version('1')
  findAll(@Query() searchTodoDto: SearchTodoDto) {
    return this.todoService.findAll(searchTodoDto);
  }
  @Get('todos')
  @Version('2')
  fidAllQuery(@Query() searchTodoDto: SearchTodoDto) {
    return this.todoService.findAllQueryBuilder(searchTodoDto);
  }
  @Delete('/:id')
  @Version('1')
  deleteTodoById(@Param('id', ParseIntPipe) id) {
    return this.todoService.deleteTodoById(id);
  }
  @Delete('/:id')
  @Version('2')
  deleteDBTodoById(@Param('id', ParseIntPipe) id) {
    return this.todoService.softdeleteDBId(id);
  }
  @Patch('/soft/:id')
  restoreDBTodoById(@Param('id', ParseIntPipe) id) {
    return this.todoService.restoreTodo(id);
  }

  @Put('/:id')
  @Version('1')
  updateTodo(@Body() newTodo: UpdateTodoDto, @Param('id', ParseIntPipe) id) {
    return this.todoService.updateTodo(newTodo, id);
  }
  @Put('/:id')
  @Version('2')
  updateDB(@Body() newTodo: UpdateTodoDto, @Param('id', ParseIntPipe) id) {
    return this.todoService.updateDB(newTodo, id);
  }
  @Get('/status/:stat')
  countStatus(@Param('stat') stat: string) {
    return this.todoService.countTodoByStatus(stat);
  }

  @Post()
  countStats(@Body() dateTimeInterval: DateIntervalDto): Promise<TodoEntity[]> {
    return this.todoService.Stats(dateTimeInterval);
  }
}
