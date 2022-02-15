import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './Model/todo.model';
import { AddTodoDto } from './TodoDto/AddTodoDto';
import { UpdateTodoDto } from './TodoDto/UpdateTodoDto';
import { v4 as uuidv4 } from 'uuid';
import { NotFoundError } from 'rxjs';
import { TodoStatusEnum } from './enums/todo-status.enum';

@Injectable()
export class TodoService {
  private todos: Todo[] = [];

  getTodos(): Todo[] {
    return this.todos;
  }

  addTodo(newTodo: AddTodoDto): Todo {
    const { name, description } = newTodo;
    let id;
    if (this.todos.length) {
      id = this.todos[this.todos.length - 1].id + 1;
    } else {
      id = 1;
    }

    const status = TodoStatusEnum.waiting;
    const todo = {
      id,
      name,
      description,
      createdAt: new Date(),
      status,
    };
    this.todos.push(todo);
    return todo;
  }

  getTodoById(id: number) {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      return todo;
    } else {
      throw new NotFoundError('todo not found');
    }
  }

  deleteTodoById(id: number) {
    const dtodo = this.getTodoById(id);

    this.todos = this.todos.filter((todo) => todo !== dtodo);
    return 'todo deleted';
  }

  update(newTodo: UpdateTodoDto, id: number) {
    const todo = this.getTodoById(id);
    todo.description = newTodo.description
      ? newTodo.description
      : todo.description;
    todo.name = newTodo.name ? newTodo.name : todo.name;
    todo.status = newTodo.status ? newTodo.status : todo.status;
    return todo;
  }
}
