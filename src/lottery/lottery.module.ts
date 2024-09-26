import { Module } from '@nestjs/common';
import { LotteryService } from './lottery.service';
import { LotteryController } from './lottery.controller';
import { Lottery } from './entities/lottery.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [LotteryController],
  providers: [LotteryService],
  exports: [LotteryService],
  imports: [TypeOrmModule.forFeature([Lottery])],
})
export class LotteryModule {}
