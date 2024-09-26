import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsNumber()
  idUser: number;
  @IsString()
  @MaxLength(50, {
    message: 'El nombre es demasiado extenso máximo 50 caracteres',
  })
  @MinLength(3, {
    message: 'El nombre es demasiado corto. Minimo 3 caracteres',
  })
  name: string;
  @IsString()
  @MaxLength(50, {
    message: 'El apellido es demasiado extenso. Maximo 50 caracteres',
  })
  @MinLength(3, {
    message: 'El apellido es demasiado corto. Minimo 3 caracteres',
  })
  lastName: string;
  @IsString()
  @MaxLength(20, {
    message: 'El teléfono es demasiado extenso. Maximo 20 caracteres',
  })
  phone: string;
}
