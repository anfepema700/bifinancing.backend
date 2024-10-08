import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Module({
  controllers: [LoginController],
  providers: [LoginService],
  exports: [LoginService],
  imports: [TypeOrmModule.forFeature([User])],
})
export class LoginModule {}
