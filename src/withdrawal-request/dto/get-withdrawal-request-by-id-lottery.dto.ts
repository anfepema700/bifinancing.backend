import { IsNumber } from 'class-validator';

export class GetWithdrawalRequestByIdLotteryDto {
  @IsNumber()
  idLottery: number;
  @IsNumber()
  idUser: number;
}
