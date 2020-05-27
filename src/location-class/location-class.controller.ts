import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, HttpException, HttpStatus, Query } from '@nestjs/common';
import { CreateDto, FindDto} from './location-class.dto';

import { LocationClassService } from './location-class.service';


@Controller('location-class')
export class LocationClassController {
  constructor(private locationClassService: LocationClassService) { }

  @Get()
  async findAll(@Query() filters: FindDto) {
    return this.locationClassService.findAll(filters);
  }
  @Get('roots')
  async findRoots() {
    return this.locationClassService.findAll({parentId:null});
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const locationClass = this.locationClassService.findById(id);
    if (!locationClass) {
      throw new HttpException('Unprocessable Entity', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return locationClass;
  }

  @Post()
  async create(@Body() props: CreateDto) {
    return this.locationClassService.create(props);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const affected = await this.locationClassService.delete(id);
    if (!affected) {
      throw new HttpException('Unprocessable Entity', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return affected;
  }

}
