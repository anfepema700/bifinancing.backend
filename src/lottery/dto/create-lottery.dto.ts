import {
  IsDate,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateLotteryDto {
  @IsString()
  @MaxLength(100, { message: 'Máximo 100 caracteres' })
  @MinLength(2, { message: 'mínimo 2 caracteres' })
  descriptionLottery: string;
  @IsNumber()
  rewardLottery: number;
  @IsDate({ message: 'La fecha de finalización debe ser una fecha' })
  dateEndLottery: Date;
}
