import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cv } from '../../cv/entities/cv.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 50 })
  username: string;
  @Column({ length: 50 })
  email: string;
  @Column({ length: 50 })
  password: string;

  @OneToMany(() => Cv, (cv) => cv.user, {})
  cvs: Cv[];
}
