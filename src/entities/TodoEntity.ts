import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TodoStatusEnum } from '../todo/enums/todo-status.enum';
import { TimeEntity } from './TimeEntity';

@Entity('todo')
export class TodoEntity extends TimeEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 50, unique: true })
  name: string;
  @Column()
  description: string;
  @Column({
    type: 'enum',
    enum: TodoStatusEnum,
    default: TodoStatusEnum.waiting,
  })
  status: TodoStatusEnum;
}
