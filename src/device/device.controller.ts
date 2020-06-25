import { Controller, Get, Param, ParseIntPipe, Post, Put, Body, Delete, Query, HttpException, HttpStatus } from '@nestjs/common';
import { DeviceService } from './device.service';
import { CreateDto, FindDto, UpdateDto } from './device.dto';

@Controller('device')
export class DeviceController {
  constructor(private deviceService: DeviceService) { }
  
  @Get()
  async findAll(@Query() filters: FindDto) {
    return this.deviceService.findAll(filters);
  }

  @Get(':id')
  async findById(@Param('id', new ParseIntPipe()) id: number) {
    const device = await this.deviceService.findById(id);
    if (!device) {
      throw new HttpException('Unprocessable Entity', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return device;
  }

  @Get('serial/:serial')
  async findBySerial(@Param('serial') serial: string) {
    const device = await this.deviceService.findBySerial(serial);
    if (!device) {
      throw new HttpException('Unprocessable Entity', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return device;
  }

  @Post()
  async create(@Body() props: CreateDto) {
    return this.deviceService.create(props);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() props: UpdateDto
  ) {
    const device = await this.deviceService.update(id, props);
    if (!device) {
      throw new HttpException('Unprocessable Entity', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return device;
  }

  @Delete(':id')
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    const affected = await this.deviceService.delete(id);
    if (!affected) {
      throw new HttpException('Unprocessable Entity', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return affected;
  }

  @Put(':id/add-point/:pointId')
  async addPoint(@Param('id', new ParseIntPipe()) id: number,
    @Param('pointId', new ParseIntPipe()) pointId: number) {
    const affected = await this.deviceService.addPoint(id, pointId);
    if (!affected) {
      throw new HttpException('Unprocessable Entity', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return affected;
  }

  @Delete(':id/decommission-for-point/:pointId')
  async decommissionForPoint(@Param('id', new ParseIntPipe()) id: number,
    @Param('pointId', new ParseIntPipe()) pointId: number) {
    const affected = await this.deviceService.decommissionForPoint(id, pointId);
    if (!affected) {
      throw new HttpException('Unprocessable Entity', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return affected;
  }
}
