import { IsNumber } from 'class-validator';

export class LotteryToUserDto {
  @IsNumber()
  idUser: number;
  @IsNumber()
  idLottery: number;
}
