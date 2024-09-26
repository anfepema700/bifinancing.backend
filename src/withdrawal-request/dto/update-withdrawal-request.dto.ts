import { IsDate, IsNumber, IsString } from 'class-validator';

export class UpdateWithdrawalRequestDto {
  @IsNumber()
  idWithdrawalRequest: number;
  @IsString()
  responseWithdrawalRequest: string;
  @IsDate()
  dateResponse: Date;
}
