import { Controller, Get, Query, Body, Post, Param, ParseIntPipe, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { SensorService } from './sensor.service';
import { CreateDto, FindDto } from './sensor.dto';

@Controller('sensor')
export class SensorController {
  constructor(private sensorService: SensorService) { }

  @Get()
  async findAll(@Query() filters: FindDto) {
    return this.sensorService.findAll(filters);
  }

  @Post()
  async create(@Body() props: CreateDto) {
    return this.sensorService.create(props);
  }

  @Get(':id')
  async findById(@Param('id', new ParseIntPipe()) id: number) {
    const sensor = await this.sensorService.findById(id);
    if (!sensor) {
      throw new HttpException('Resource not found', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return sensor;
  }

  @Delete(':id')
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    const sensor = await this.sensorService.delete(id);
    if (!sensor) {
      throw new HttpException('Resource not found', HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
