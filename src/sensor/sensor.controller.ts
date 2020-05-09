import { Controller, Get, Query, Body, Post, Param, ParseIntPipe, Delete, HttpException, HttpStatus, Put } from '@nestjs/common';
import { SensorService } from './sensor.service';
import { CreateDto, FindDto, UpdateDto } from './sensor.dto';

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
    return sensor;
  }

  @Put(':id')
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() props: UpdateDto
  ) {
    const sensor = this.sensorService.update(id, props);
    if (!sensor) {
      throw new HttpException('Resource not found', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return sensor;
  }


  @Put(':id/add-point-of-location/:locationId')
  async addPointOfLocation(@Param('id', new ParseIntPipe()) id: number,
    @Param('locationId', new ParseIntPipe()) locationId: number) {
    const affected = await this.sensorService.addPointOfLocation(id, locationId);
    if (!affected) {
      throw new HttpException('Resource not found', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return affected;
  }

  @Delete(':id/remove-point-of-location/:locationId')
  async removePointOfLocation(@Param('id', new ParseIntPipe()) id: number,
    @Param('locationId', new ParseIntPipe()) locationId: number) {
    const affected = await this.sensorService.removePointOfLocation(id, locationId);
    if (!affected) {
      throw new HttpException('Resource not found', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return affected;
  }


  @Put(':id/add-point-of-equipment/:equipmentId')
  async addPointOfEquipment(@Param('id', new ParseIntPipe()) id: number,
    @Param('equipmentId', new ParseIntPipe()) equipmentId: number) {
    const affected = await this.sensorService.addPointOfEquipment(id, equipmentId);
    if (!affected) {
      throw new HttpException('Resource not found', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return affected;
  }

  @Delete(':id/remove-point-of-equipment/:equipmentId')
  async removePointOfEquipment(@Param('id', new ParseIntPipe()) id: number,
    @Param('equipmentId', new ParseIntPipe()) equipmentId: number) {
    const affected = await this.sensorService.removePointOfEquipment(id, equipmentId);
    if (!affected) {
      throw new HttpException('Resource not found', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return affected;
  }
}
