import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TechnicalSupportService } from './technical-support.service';
import { CreateTechnicalSupportDto } from './dto/create-technical-support.dto';
import { UpdateTechnicalSupportDto } from './dto/update-technical-support.dto';

@Controller('technical-support')
export class TechnicalSupportController {
  constructor(
    private readonly technicalSupportService: TechnicalSupportService,
  ) {}

  @Post('create-report')
  create(@Body() createTechnicalSupportDto: CreateTechnicalSupportDto) {
    return this.technicalSupportService.create(createTechnicalSupportDto);
  }
  @Post('update-report')
  updateReport(@Body() updateTechnicalSupportDto: UpdateTechnicalSupportDto) {
    return this.technicalSupportService.updateReport(updateTechnicalSupportDto);
  }
  @Get('get-report-by-id/:idUser')
  getReportByIdUser(@Param('idUser') idUser: number) {
    return this.technicalSupportService.getReportByIdUser(idUser);
  }

  @Get('get-all-reports')
  findAll() {
    return this.technicalSupportService.findAll();
  }
}
