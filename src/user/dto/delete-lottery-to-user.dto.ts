import { IsArray, IsNumber } from 'class-validator';

export class DeleteLotteryToUserDto {
  @IsNumber()
  idLottery: number;

  @IsArray()
  idUser: number;
}
