import {
  IsNotEmpty,
  Length,
  MinLength,
  ValidationArguments,
} from 'class-validator';
import { ErrorMessages } from '../enums/errorMessages';

export class AddTodoDto {
  @IsNotEmpty({
    message: ErrorMessages.isEmpty + 'nom',
  })
  @Length(3, 10, {
    message: (validationData: ValidationArguments) => {
      return `La taille de votre ${validationData.property} ${validationData.value} 
      est entre ${validationData.constraints[0]} et ${validationData.constraints[1]}`;
    },
  })
  name: string;
  @MinLength(10, {
    message:
      'La taille de votre $property $value est courte, la taille minimale de $property est $constraint1',
  })
  @IsNotEmpty({
    message: ErrorMessages.isEmpty + 'description',
  })
  description: string;
}
