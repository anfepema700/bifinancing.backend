import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsNumber()
  idUser: number;
  @IsString()
  @MinLength(4, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @MaxLength(20, {
    message: 'La contraseña debe tener como maximo 20 caracteres',
  })
  password: string;
}
