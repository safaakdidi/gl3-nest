import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Skill } from '../../../../../../../../../Users/PAVILION/Downloads/cv-nest/cv-nest/src/skill/entities/skill.entity';
import { User } from '../../../../../../../../../Users/PAVILION/Downloads/cv-nest/cv-nest/src/user/entities/user.entity';

@Entity()
export class Cv {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 50 })
  name: string;
  @Column({ length: 50 })
  firstname: string;
  @Column({ length: 50 })
  age: number;
  @Column({ length: 50 })
  Cin: string;
  @Column({ length: 50 })
  Job: string;
  @Column({ length: 50 })
  path: string;

  @ManyToMany((MyTargetEntity) => Skill, (skill) => skill.cvs, {})
  @JoinTable({
    name: 'cv_skill',
    joinColumn: {
      name: 'cv',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'skill',
      referencedColumnName: 'id',
    },
  })
  skills: Skill[];

  @ManyToOne((TargetEntity) => User, (user) => user.cvs, {})
  user: User;
}
