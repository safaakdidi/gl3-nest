import { Injectable, NotFoundException, Version } from '@nestjs/common';
import { Todo } from './Model/todo.model';
import { AddTodoDto } from './TodoDto/AddTodoDto';
import { UpdateTodoDto } from './TodoDto/UpdateTodoDto';
import { v4 as uuidv4 } from 'uuid';
import { NotFoundError } from 'rxjs';
import { TodoStatusEnum } from './enums/todo-status.enum';
import { Like, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from '../entities/TodoEntity';
import { SearchTodoDto } from './TodoDto/SearchTodoDto';
import { DateIntervalDto } from './TodoDto/date-interval.dto';

@Injectable()
export class TodoService {
  private todos: Todo[] = [];
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}
  getTodos(): Todo[] {
    return this.todos;
  }
  getBDTodos(): Promise<TodoEntity[]> {
    return this.todoRepository.find();
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

  addDBTodo(newTodo: AddTodoDto): Promise<TodoEntity> {
    return this.todoRepository.save(newTodo);
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
  getBDTodoById(id: number): Todo {
    const todo = this.todos.find((actualTodo) => actualTodo.id === id);
    if (!todo) {
      throw new NotFoundException('Todo inexistant');
    }
    return todo;
  }
  async softdeleteDBId(id) {
    return await this.todoRepository.softDelete(id);
  }

  async restoreTodo(id: number): Promise<UpdateResult> {
    return await this.todoRepository.restore(id);
  }

  updateTodo(newTodo: UpdateTodoDto, id: number) {
    const todo = this.getTodoById(id);
    todo.description = newTodo.description
      ? newTodo.description
      : todo.description;
    todo.name = newTodo.name ? newTodo.name : todo.name;
    todo.status = newTodo.status ? newTodo.status : todo.status;
    return todo;
  }
  async updateDB(updateTodo: UpdateTodoDto, id: number): Promise<TodoEntity> {
    const newTodo = await this.todoRepository.preload({
      id,
      ...updateTodo,
    });
    if (newTodo) {
      return this.todoRepository.save(newTodo);
    }
    throw new NotFoundException('Todo innexistant');
  }
  async countTodoByStatus(stat: string) {
    const condition = {
      status: Like(`%${stat}%`),
    };
    const [list, count] = await Promise.all([
      this.todoRepository.find({
        select: {
          id: true,
          name: true,
          description: true,
        },
        where: condition,
      } as any),
      this.todoRepository.count(),
    ]);
    return {
      list,
      count,
    };
  }

  async Stats(dateTimeInterval: DateIntervalDto): Promise<TodoEntity[]> {
    const queryBuilder = this.todoRepository.createQueryBuilder('todo');
    const { dateMin, dateMax } = dateTimeInterval;

    if (dateMin && dateMax) {
      return queryBuilder
        .select('status,count(*) as nb')
        .groupBy('status')
        .having(':dateMin < created_at', { dateMin: dateMin })
        .andHaving('created_at < :dateMax', { dateMax: dateMax })
        .getRawMany();
    } else {
      return queryBuilder
        .select('status,count(*) as nb')
        .groupBy('status')
        .getRawMany();
    }
  }

  findAll(searchTodoDto: SearchTodoDto): Promise<TodoEntity[]> {
    const criterias = [];
    if (searchTodoDto.status) {
      criterias.push({ status: searchTodoDto.status });
    }
    if (searchTodoDto.criteria) {
      criterias.push({ name: Like(`%${searchTodoDto.criteria}%`) });
      criterias.push({ description: Like(`%${searchTodoDto.criteria}%`) });
    }
    if (criterias.length) {
      return this.todoRepository.find({ withDeleted: true, where: criterias });
    }

    return this.todoRepository.find({ withDeleted: true });
  }
  findAllQueryBuilder(searchTodoDto: SearchTodoDto): Promise<TodoEntity[]> {
    const queryBuilder = this.todoRepository.createQueryBuilder('todo');
    let todos;
    if (searchTodoDto.status && !searchTodoDto.criteria) {
      todos = queryBuilder
        .select()
        .where('todo.status=:status', { status: searchTodoDto.status })
        .take(10)
        .skip(10)
        .getMany();
    } else if (!searchTodoDto.status && searchTodoDto.criteria) {
      todos = queryBuilder
        .select()
        .where('todo.name=:criteria OR todo.description=:criteria', {
          crtaria: searchTodoDto.criteria,
        })
        .take(10)
        .skip(10)
        .getMany();
    } else if (searchTodoDto.status && searchTodoDto.criteria) {
      todos = queryBuilder
        .select()
        .where('todo.status=:status', { status: searchTodoDto.status })
        .andWhere('todo.name=:criteria OR todo.description=:criteria', {
          crtaria: searchTodoDto.criteria,
        })
        .take(10)
        .skip(10)
        .getMany();
    } else {
      todos = this.todoRepository.find({ withDeleted: true });
    }

    return todos;
  }
}
