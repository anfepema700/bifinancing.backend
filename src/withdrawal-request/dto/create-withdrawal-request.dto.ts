import { IsNumber } from 'class-validator';

export class CreateWithdrawalRequestDto {
  @IsNumber()
  idUser: number;
  @IsNumber()
  idLottery: number;
}
