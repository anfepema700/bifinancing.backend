import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WithdrawalRequest } from './entities/withdrawal-request.entity';
import { Repository } from 'typeorm';
import { CreateWithdrawalRequestDto } from './dto/create-withdrawal-request.dto';
import { UpdateWithdrawalRequestDto } from './dto/update-withdrawal-request.dto';
import { GetWithdrawalRequestByIdUserDto } from './dto/get-withdrawal-request-by-id-user.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class WithdrawalRequestService {
  constructor(
    @InjectRepository(WithdrawalRequest)
    private readonly withdrawalRequestRepository: Repository<WithdrawalRequest>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createWithdrawalRequest(
    createWithdrawalRequestDto: CreateWithdrawalRequestDto,
  ) {
    try {
      const { idUser } = createWithdrawalRequestDto;
      const findUser = await this.userRepository.findOne({
        where: { idUser },
      });
      const dataForSave = {
        ...createWithdrawalRequestDto,
        user: findUser,
      };
      const createWithdrawalRequest =
        this.withdrawalRequestRepository.create(dataForSave);
      await this.withdrawalRequestRepository.save(createWithdrawalRequest);
      return {
        statusCode: 200,
        message: 'Solicitud de retiro registrada con éxito',
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async updateWithdrawalRequest(
    updateWithdrawalRequestDto: UpdateWithdrawalRequestDto,
  ) {
    try {
      const { idWithdrawalRequest } = updateWithdrawalRequestDto;
      const updateWithrawal = await this.withdrawalRequestRepository.update(
        idWithdrawalRequest,
        {
          ...updateWithdrawalRequestDto,
        },
      );
      if (!updateWithrawal.affected) {
        return { statusCode: 404, message: 'No se encontro la solicitud' };
      }
      return { statusCode: 200, message: 'Solicitud realizada con éxito' };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getAllWithdrawalRequest() {
    try {
      const findAllWithdrawal = await this.withdrawalRequestRepository.find({
        relations: { user: true },
      });
      if (findAllWithdrawal.length === 0) {
        return {
          statusCode: 200,
          message: 'No hay solicitudes registradas',
        };
      }
      return {
        statusCode: 200,
        data: findAllWithdrawal,
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllWithdrawalRequestByIdUser(
    getWithdrawalRequestByIdUserDto: GetWithdrawalRequestByIdUserDto,
  ) {
    try {
      const { idUser } = getWithdrawalRequestByIdUserDto;
      const findAllWithdrawal = await this.userRepository.find({
        where: { idUser },
        relations: { withdrawalRequest: true },
      });
      const { withdrawalRequest } = findAllWithdrawal[0];

      if (withdrawalRequest.length === 0) {
        return {
          statusCode: 200,
          message: 'No hay solicitudes registradas',
        };
      }
      return {
        statusCode: 200,
        data: withdrawalRequest,
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
