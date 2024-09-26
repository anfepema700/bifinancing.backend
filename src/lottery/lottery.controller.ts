import { Controller, Get, Post, Body } from '@nestjs/common';
import { LotteryService } from './lottery.service';
import { CreateLotteryDto } from './dto/create-lottery.dto';
import { UpdateLotteryDto } from './dto/update-lottery.dto';

@Controller('lottery')
export class LotteryController {
  constructor(private readonly lotteryService: LotteryService) {}

  @Post('create-lottery')
  create(@Body() createLotteryDto: CreateLotteryDto) {
    return this.lotteryService.create(createLotteryDto);
  }

  @Post('update-lottery')
  updateLottery(@Body() updateLotteryDto: UpdateLotteryDto) {
    return this.lotteryService.updateLottery(updateLotteryDto);
  }

  @Get('get-all-lottery')
  findAll() {
    return this.lotteryService.findAll();
  }
}
