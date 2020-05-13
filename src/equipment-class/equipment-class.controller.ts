import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, HttpException, HttpStatus, Query } from '@nestjs/common';
import { CreateDto, FindDto} from './equipment-class.dto';

import { EquipmentClassService } from './equipment-class.service';


@Controller('equipment-class')
export class EquipmentClassController {
  constructor(private equipmentClassService: EquipmentClassService) { }

  @Get()
  async findAll(@Query() filters: FindDto) {
    return this.equipmentClassService.findAll(filters);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const equipmentClass = this.equipmentClassService.findById(id);
    if (!equipmentClass) {
      throw new HttpException('Unprocessable Entity', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return equipmentClass;
  }

  @Post()
  async create(@Body() props: CreateDto) {
    return this.equipmentClassService.create(props);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const affected = await this.equipmentClassService.delete(id);
    if (!affected) {
      throw new HttpException('Unprocessable Entity', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return affected;
  }

}
