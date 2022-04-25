import { Cv } from '../../cv/entities/cv.entity';
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3, {
    message: 'La taille minimale du nom est de 3 caractères',
  })
  @MaxLength(50, {
    message: 'La taille maximale du nom est de 50 caractères',
  })
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6, {
    message: 'La taille minimale du password est de 6 caractères',
  })
  @MaxLength(50, {
    message: 'La taille maximale du password est de 50 caractères',
  })
  password: string;

  @IsOptional()
  cvs: Cv[];
}
