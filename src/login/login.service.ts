import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ValidateLoginDto } from './dto/validate-login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async validateLogin(validateLoginDto: ValidateLoginDto) {
    try {
      const { password, user } = validateLoginDto;
      const findUserData = await this.userRepository.findOne({
        where: { user },
      });
      if (!findUserData) {
        return { statusCode: 404, message: 'Usuario no existe' };
      }
      if (findUserData.state === false) {
        return { statusCode: 404, message: 'Usuario inactivo' };
      }
      if (await bcrypt.compare(password, findUserData.password)) {
        const dataForReturn = {
          idUser: findUserData.idUser,
          role: findUserData.role,
        };
        return {
          statusCode: 200,
          message: 'Credenciales correctas',
          data: dataForReturn,
        };
      } else {
        return {
          statusCode: 401,
          message: 'Usuario y/o contraseña incorrectas',
        };
      }
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
