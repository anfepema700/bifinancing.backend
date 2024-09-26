import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LotteryModule } from 'src/lottery/lottery.module';
import { LotteryService } from 'src/lottery/lottery.service';
import { Lottery } from 'src/lottery/entities/lottery.entity';

@Module({
  controllers: [UserController],
  providers: [UserService, LotteryService],
  exports: [UserService],
  imports: [LotteryModule, TypeOrmModule.forFeature([User, Lottery])],
})
export class UserModule {}
