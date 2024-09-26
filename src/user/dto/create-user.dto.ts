import {
  IsEnum,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'El usuario debe ser un string' })
  @MaxLength(100, { message: 'Usuario máximo de 100 caracteres' })
  user: string;
  @IsString()
  @MinLength(4, { message: 'La contraseña debe tener al menos 4 caracteres' })
  @MaxLength(50, {
    message: 'La contraseña debe tener como maximo 50 caracteres',
  })
  password: string;
  @IsString()
  @MaxLength(100, {
    message: 'El nombre debe tener como maximo 100 caracteres',
  })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  name: string;
  @IsString()
  @MaxLength(100, {
    message: 'El apellido debe tener como maximo 100 caracteres',
  })
  @MinLength(2, { message: 'El apellido debe tener al menos 2 caracteres' })
  lastName: string;
  @IsString()
  @MaxLength(20, {
    message: 'El telefono debe tener como maximo 20 caracteres',
  })
  phone: string;
  @IsEnum(['admin', 'user'], { message: 'El rol debe ser admin o user' })
  role: string;
  @IsNumber()
  balance: number;
}
