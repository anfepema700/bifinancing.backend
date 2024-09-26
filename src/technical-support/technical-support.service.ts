import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTechnicalSupportDto } from './dto/create-technical-support.dto';
import { UpdateTechnicalSupportDto } from './dto/update-technical-support.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TechnicalSupport } from './entities/technical-support.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TechnicalSupportService {
  constructor(
    @InjectRepository(TechnicalSupport)
    private technicalSupportRepository: Repository<TechnicalSupport>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createTechnicalSupportDto: CreateTechnicalSupportDto) {
    try {
      const { idUser } = createTechnicalSupportDto;
      const findUser = await this.userRepository.findOne({
        where: { idUser },
      });
      const dataForSave = {
        ...createTechnicalSupportDto,
        user: findUser,
      };
      const createReport =
        await this.technicalSupportRepository.create(dataForSave);
      await this.technicalSupportRepository.save(createReport);
      return { statusCode: 200, message: 'Reporte creado con exito' };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateReport(updateTechnicalSupportDto: UpdateTechnicalSupportDto) {
    try {
      const { idTechnicalSupport } = updateTechnicalSupportDto;
      const dateNow = new Date();
      const date = `${dateNow.getFullYear()}-${dateNow.getMonth() + 1}-${dateNow.getDate()}`;
      const dataForSave = {
        ...updateTechnicalSupportDto,
        dateResult: date,
      };
      const updateReport = await this.technicalSupportRepository.update(
        idTechnicalSupport,
        { ...dataForSave },
      );
      if (!updateReport.affected) {
        return { statusCode: 404, message: 'Reporte no encontrado' };
      }
      return { statusCode: 200, message: 'Reporte actualizado con éxito' };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getReportByIdUser(idUser: number) {
    try {
      const report = await this.userRepository.find({
        where: { idUser },
        relations: { technicalSupport: true },
      });
      const { technicalSupport } = report[0];
      if (technicalSupport.length === 0) {
        return { statusCode: 200, message: 'El usuario no tiene reportes' };
      }
      return {
        statusCode: 200,
        data: technicalSupport,
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
      const reports = await this.technicalSupportRepository.find({
        relations: { user: true },
      });
      if (!reports) {
        return { statusCode: 200, message: 'No hay reportes registrados' };
      }
      return { statusCode: 200, data: reports };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
