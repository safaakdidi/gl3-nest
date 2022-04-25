import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Cv } from '../../cv/entities/cv.entity';

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 100 })
  Designation: string;
  @ManyToMany(() => Cv, (cv) => cv.skills)
  cvs: Cv[];
}
