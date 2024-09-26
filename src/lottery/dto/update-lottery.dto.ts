import { PartialType } from '@nestjs/mapped-types';
import { CreateLotteryDto } from './create-lottery.dto';
import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateLotteryDto extends PartialType(CreateLotteryDto) {
  @IsNumber()
  idLottery: number;
  @IsString()
  @MaxLength(100, { message: 'Máximo 100 caracteres' })
  @MinLength(2, { message: 'mínimo 2 caracteres' })
  descriptionLottery: string;
  @IsNumber()
  numberLottery: number;
  @IsNumber()
  rewardLottery: number;
  @IsDate()
  dateEndLottery: Date;
  @IsBoolean()
  stateLottery: boolean;
}
