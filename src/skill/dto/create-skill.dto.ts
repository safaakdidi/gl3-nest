import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateSkillDto {
  @IsString()
  @MinLength(2, {
    message: 'La taille minimale de la designation est de 2 caractères',
  })
  @MaxLength(100, {
    message: 'La taille maximale de la designation est de 100 caractères',
  })
  designation: string;
}
