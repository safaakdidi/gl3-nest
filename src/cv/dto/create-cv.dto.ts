import {
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
  Min,
  Max,
  IsOptional,
} from 'class-validator';
import { Skill } from '../../../../../../../../../Users/PAVILION/Downloads/cv-nest/cv-nest/src/skill/entities/skill.entity';
import { User } from '../../../../../../../../../Users/PAVILION/Downloads/cv-nest/cv-nest/src/user/entities/user.entity';

export class CreateCvDto {
  @IsString()
  @MinLength(3, {
    message: 'La taille minimale du nom est de 3 caractères',
  })
  @MaxLength(50, {
    message: 'La taille maximale du nom est de 50 caractères',
  })
  name: string;

  @IsString()
  @MinLength(3, {
    message: 'La taille minimale du prenom est de 3 caractères',
  })
  @MaxLength(50, {
    message: 'La taille maximale du prenom est de 50 caractères',
  })
  firstname: string;

  @IsNumber()
  @Min(15)
  @Max(75)
  age: number;
  @IsString()
  @MinLength(3, {
    message: 'La taille minimale du nom est de 8 caractères',
  })
  @MaxLength(50, {
    message: 'La taille maximale du nom est de 12 caractères',
  })
  cin: string;
  @IsString()
  @MinLength(3, {
    message: 'La taille minimale est de 3 caractères',
  })
  @MaxLength(50, {
    message: 'La taille maximale est de 50 caractères',
  })
  job: string;
  path: string;
  @IsOptional()
  skills: Skill[];
  user: User;
}
