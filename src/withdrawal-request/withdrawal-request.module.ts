import { Module } from '@nestjs/common';
import { WithdrawalRequestService } from './withdrawal-request.service';
import { WithdrawalRequestController } from './withdrawal-request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WithdrawalRequest } from './entities/withdrawal-request.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  controllers: [WithdrawalRequestController],
  providers: [WithdrawalRequestService],
  exports: [WithdrawalRequestService],
  imports: [TypeOrmModule.forFeature([WithdrawalRequest, User])],
})
export class WithdrawalRequestModule {}
