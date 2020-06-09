import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, HttpException, HttpStatus, Query } from '@nestjs/common';
import { CreateDto, FindDto} from './device-class.dto';

import { DeviceClassService } from './device-class.service';


@Controller('device-class')
export class DeviceClassController {
  constructor(private deviceClassService: DeviceClassService) { }

  @Get()
  async findAll(@Query() filters: FindDto) {
    return this.deviceClassService.findAll(filters);
  }
  @Get('roots')
  async findRoots() {
    return this.deviceClassService.findAll({parentId:null});
  }
  @Get(':id')
  async findById(@Param('id') id: string) {
    const deviceClass = this.deviceClassService.findById(id);
    if (!deviceClass) {
      throw new HttpException('Unprocessable Entity', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return deviceClass;
  }

  @Post()
  async create(@Body() props: CreateDto) {
    return this.deviceClassService.create(props);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const affected = await this.deviceClassService.delete(id);
    if (!affected) {
      throw new HttpException('Unprocessable Entity', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return affected;
  }

}
