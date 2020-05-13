import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, HttpException, HttpStatus, Query } from '@nestjs/common';
import { CreateDto, FindDto} from './point-class.dto';

import { PointClassService } from './point-class.service';


@Controller('point-class')
export class PointClassController {
  constructor(private pointClassService: PointClassService) { }

  @Get()
  async findAll(@Query() filters: FindDto) {
    return this.pointClassService.findAll(filters);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const pointClass = this.pointClassService.findById(id);
    if (!pointClass) {
      throw new HttpException('Unprocessable Entity', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return pointClass;
  }

  @Post()
  async create(@Body() props: CreateDto) {
    return this.pointClassService.create(props);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const affected = await this.pointClassService.delete(id);
    if (!affected) {
      throw new HttpException('Unprocessable Entity', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return affected;
  }

}
