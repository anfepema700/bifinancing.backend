import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserAdminDto } from './dto/update-user-admin.dto';
import { LotteryToUserDto } from './dto/lottery-to-user.dto';
import { DeleteLotteryToUserDto } from './dto/delete-lottery-to-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create-user')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @Post('/update-user-admin')
  updateUserAdmin(@Body() updateUserAdminDto: UpdateUserAdminDto) {
    return this.userService.updateUserAdmin(updateUserAdminDto);
  }
  @Post('/update-user')
  updateUserProfile(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUserProfile(updateUserDto);
  }
  @Get('/get-user-data-by-id/:idUser')
  getUserDataById(@Param('idUser') idUser: number) {
    return this.userService.getUserDataById(idUser);
  }
  @Get('get-all-user')
  getAllUserData() {
    return this.userService.findAll();
  }
  @Post('add-lottery-to-user')
  addLotteryToUser(@Body() lotteryToUserDto: LotteryToUserDto) {
    return this.userService.addLotteryToUser(lotteryToUserDto);
  }
  @Post('delete-lottery-to-user')
  deleteLotteryToUser(@Body() lotteryToUserDto: DeleteLotteryToUserDto) {
    return this.userService.deleteLotteryToUser(lotteryToUserDto);
  }
  @Post('change-password')
  changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return this.userService.changePassword(changePasswordDto);
  }
}
