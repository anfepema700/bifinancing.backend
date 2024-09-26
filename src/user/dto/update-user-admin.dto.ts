import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserAdminDto {
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
  @IsNumber()
  balance: number;
  @IsString()
  @MaxLength(50, {
    message: 'El usuario es demasiado extenso. Maximo 50 caracteres',
  })
  @MinLength(5, {
    message: 'El usuario es demasiado corto. Minimo 5 caracteres',
  })
  user: string;
  @IsString()
  @MaxLength(20, {
    message: 'El teléfono es demasiado extenso. Maximo 20 caracteres',
  })
  phone: string;
  @IsBoolean({ message: 'El estado debe ser true o false' })
  state: boolean;
  @IsEnum(['admin', 'user'])
  role: string;
}
