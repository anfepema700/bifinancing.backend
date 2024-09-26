import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateTechnicalSupportDto {
  @IsNumber()
  idTechnicalSupport: number;
  @IsString()
  @MaxLength(255, {
    message: 'La respuesta debe ser de máximo 255 caracteres',
  })
  @MinLength(5, {
    message: 'La respuesta debe ser de minimo 5 caracteres',
  })
  descriptionResult: string;
}
