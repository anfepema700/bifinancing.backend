import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLotteryDto } from './dto/create-lottery.dto';
import { UpdateLotteryDto } from './dto/update-lottery.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lottery } from './entities/lottery.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LotteryService {
  constructor(
    @InjectRepository(Lottery)
    private readonly lotteryRepository: Repository<Lottery>,
  ) {}
  async create(createLotteryDto: CreateLotteryDto) {
    try {
      const createLottery =
        await this.lotteryRepository.create(createLotteryDto);
      await this.lotteryRepository.save(createLottery);

      return {
        statusCode: 200,
        message: 'Sorteo creado correctamente',
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async updateLottery(updateLotteryDto: UpdateLotteryDto) {
    try {
      const { idLottery } = updateLotteryDto;
      const updateLottery = await this.lotteryRepository.update(idLottery, {
        ...updateLotteryDto,
      });
      if (!updateLottery.affected) {
        return {
          statusCode: 400,
          message: 'El sorteo no existe',
        };
      }
      return {
        statusCode: 200,
        message: 'Sorteo actualizado correctamente',
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async findAll() {
    try {
      const findAllLottery = await this.lotteryRepository.find();
      if (!findAllLottery) {
        return { status: 200, message: 'No hay sorteos registrados' };
      }
      return {
        data: findAllLottery,
        statusCode: 200,
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
