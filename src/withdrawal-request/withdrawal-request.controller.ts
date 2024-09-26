import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WithdrawalRequestService } from './withdrawal-request.service';
import { CreateWithdrawalRequestDto } from './dto/create-withdrawal-request.dto';
import { UpdateWithdrawalRequestDto } from './dto/update-withdrawal-request.dto';
import { GetWithdrawalRequestByIdUserDto } from './dto/get-withdrawal-request-by-id-user.dto';

@Controller('withdrawal-request')
export class WithdrawalRequestController {
  constructor(
    private readonly withdrawalRequestService: WithdrawalRequestService,
  ) {}

  @Post('/create-withdrawal-request')
  createWithdrawalRequest(
    @Body() createWithdrawalRequestDto: CreateWithdrawalRequestDto,
  ) {
    return this.withdrawalRequestService.createWithdrawalRequest(
      createWithdrawalRequestDto,
    );
  }

  @Post('update-withdrawal-request')
  updateWithdrawalRequest(
    @Body() updateWithdrawalRequestDto: UpdateWithdrawalRequestDto,
  ) {
    return this.withdrawalRequestService.updateWithdrawalRequest(
      updateWithdrawalRequestDto,
    );
  }

  @Get('all-withdrawal-request')
  getAllWithdrawalRequest() {
    return this.withdrawalRequestService.getAllWithdrawalRequest();
  }

  @Get('all-withdrawal-request-by-id-user/:idUser')
  getAllWithdrawalRequestByIdUser(
    @Param() getWithdrawalRequestByIdUserDto: GetWithdrawalRequestByIdUserDto,
  ) {
    return this.withdrawalRequestService.getAllWithdrawalRequestByIdUser(
      getWithdrawalRequestByIdUserDto,
    );
  }
}
