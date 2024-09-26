import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTechnicalSupportDto {
  @IsNumber()
  idUser: number;
  @IsString()
  @MaxLength(255, {
    message: 'La descripción no puede superar los 255 caracteres',
  })
  @MinLength(5, {
    message: 'La descripción debe tener al menos 5 caracteres',
  })
  description: string;
}
