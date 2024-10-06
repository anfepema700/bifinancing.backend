import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateNewWithdrawalRequestDto {
  @IsNumber()
  idUser: number;
  @IsNumber()
  idLottery: number;
  @IsDate()
  dateWithdrawalRequest: Date;
  @IsString()
  responseWithdrawalRequest: string;
  @IsDate()
  dateResponse: Date;
}
