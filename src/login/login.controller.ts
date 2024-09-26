import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';

import { ValidateLoginDto } from './dto/validate-login.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('auth')
  validate(@Body() validateLoginDto: ValidateLoginDto) {
    return this.loginService.validateLogin(validateLoginDto);
  }
}
