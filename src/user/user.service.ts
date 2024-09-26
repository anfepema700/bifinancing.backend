import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UpdateUserAdminDto } from './dto/update-user-admin.dto';
import { LotteryToUserDto } from './dto/lottery-to-user.dto';
import { Lottery } from 'src/lottery/entities/lottery.entity';
import { DeleteLotteryToUserDto } from './dto/delete-lottery-to-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Lottery)
    private readonly lotteryRepository: Repository<Lottery>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const { password, user } = createUserDto;
      const findUser = await this.userRepository.findOne({
        where: { user },
      });
      if (findUser) {
        throw new ConflictException('El usuario ya existe');
      }
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);
      createUserDto.password = hashPassword;
      const userCreate = this.userRepository.create(createUserDto);
      this.userRepository.save(userCreate);
      return { statusCode: 200, message: 'Usuario creado con éxito' };
    } catch (error) {
      if (error.code === 1062) {
        throw new ConflictException('Duplicate entry detected.');
      }
      throw new HttpException(
        error.message ||
          'Error en el servidor. Por favor, inténtelo de nuevo más tarde',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const users = await this.userRepository.find({
        relations: { lottery: true },
      });
      if (users.length === 0) {
        return {
          statusCode: 200,
          message: 'No hay usuarios registrados',
        };
      }
      return { data: users };
    } catch (error) {
      throw new HttpException(
        error.message ||
          'Error en el servidor. Por favor, inténtelo de nuevo más tarde',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateUserAdmin(updateUserAdminDto: UpdateUserAdminDto) {
    try {
      const { idUser } = updateUserAdminDto;
      /* if (password) {
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);
        updateUserAdminDto.password = hashPassword;
      } */
      const updateUserAdmin = await this.userRepository.update(idUser, {
        ...updateUserAdminDto,
      });
      if (updateUserAdmin.affected === 0) {
        return { ststatusCodeatus: 404, message: 'El usuario no existe' };
      }
      return { statusCode: 200, message: `Se actualizó la información` };
    } catch (error) {
      console.log('error', error);
      throw new HttpException(
        error.message ||
          'Error en el servidor. Por favor, inténtelo de nuevo más tarde',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async updateUserProfile(updateUserDto: UpdateUserDto) {
    try {
      const { idUser } = updateUserDto;
      /*
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);
      updateUserDto.password = hashPassword; */
      const user = await this.userRepository.update(idUser, updateUserDto);
      if (user.affected === 0) {
        return { statusCode: 400, message: 'El usuario no existe' };
      }
      return { statusCode: 200, message: `Se actualizó la información` };
    } catch (error) {
      throw new HttpException(
        error.message ||
          'Error en el servidor. Por favor, inténtelo de nuevo más tarde',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUserDataById(idUser: number) {
    try {
      const dataUser = await this.userRepository.findOne({
        where: { idUser },
        relations: {
          technicalSupport: true,
          lottery: true,
          withdrawalRequest: true,
        },
      });
      if (!dataUser) {
        return { statusCode: 404, message: 'El usuario no existe' };
      }
      return { statusCode: 200, data: dataUser };
    } catch (error) {
      throw new HttpException(
        error.message ||
          'Error en el servidor. Por favor, inténtelo de nuevo más tarde',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async addLotteryToUser(lotteryToUserDto: LotteryToUserDto) {
    try {
      const { idUser, idLottery } = lotteryToUserDto;
      const findUser = await this.userRepository.findOne({
        where: { idUser },
        relations: { lottery: true },
      });
      const findLottery = await this.lotteryRepository.findOne({
        where: { idLottery },
      });
      findUser.lottery.push(findLottery);
      await this.userRepository.save(findUser);
      return {
        statusCode: 200,
        message: 'Se agrego el sorteo al usuario correctamente',
      };
    } catch (error) {
      throw new HttpException(
        error.message ||
          'Error en el servidor. Por favor, inténtelo de nuevo más tarde',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async deleteLotteryToUser(deleteLotteryToUserDto: DeleteLotteryToUserDto) {
    try {
      const { idLottery, idUser } = deleteLotteryToUserDto;
      const findRegisterLottery = await this.lotteryRepository.findOne({
        where: { idLottery },
        relations: { user: true },
      });
      if (!findRegisterLottery) {
        return { statusCode: 404, message: 'El sorteo no existe' };
      }
      findRegisterLottery.user = findRegisterLottery.user.filter(
        (user) => user.idUser !== idUser,
      );
      await this.lotteryRepository.save(findRegisterLottery);
      return {
        statusCode: 200,
        message: 'Se elimino el sorteo al usuario correctamente',
      };
    } catch (error) {
      throw new HttpException(
        error.message ||
          'Error en el servidor. Por favor, inténtelo de nuevo más tarde',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async changePassword(changePasswordDto: ChangePasswordDto) {
    try {
      const { idUser, password } = changePasswordDto;
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);
      const changePassword = await this.userRepository.update(idUser, {
        password: hashPassword,
      });
      if (changePassword.affected === 0) {
        return { statusCode: 404, message: 'El usuario no existe' };
      }
      return {
        statusCode: 200,
        message: 'Se actualizo la contraseña correctamente',
      };
    } catch (error) {
      throw new HttpException(
        error.message ||
          'Error en el servidor. Por favor, inténtelo de nuevo más tarde',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
