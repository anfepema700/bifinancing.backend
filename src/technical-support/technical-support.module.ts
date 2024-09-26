import { Module } from '@nestjs/common';
import { TechnicalSupportService } from './technical-support.service';
import { TechnicalSupportController } from './technical-support.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechnicalSupport } from './entities/technical-support.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  controllers: [TechnicalSupportController],
  providers: [TechnicalSupportService],
  exports: [TechnicalSupportService],
  imports: [TypeOrmModule.forFeature([TechnicalSupport, User])],
})
export class TechnicalSupportModule {}
