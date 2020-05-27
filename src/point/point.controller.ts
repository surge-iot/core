import { Controller, Get, Query, Body, Post, Param, ParseIntPipe, Delete, HttpException, HttpStatus, Put } from '@nestjs/common';
import { PointService } from './point.service';
import { CreateDto, FindDto, UpdateDto } from './point.dto';

@Controller('point')
export class PointController {
  constructor(private pointService: PointService) { }

  @Get()
  async findAll(@Query() filters: FindDto) {
    return this.pointService.findAll(filters);
  }

  @Post()
  async create(@Body() props: CreateDto) {
    if(!props.locationId && !props.equipmentId){
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    console.log(props);
    return this.pointService.create(props);
  }

  @Get(':id')
  async findById(@Param('id', new ParseIntPipe()) id: number) {
    const point = await this.pointService.findById(id);
    if (!point) {
      throw new HttpException('Unprocessable Entity', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return point;
  }

  @Delete(':id')
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    const point = await this.pointService.delete(id);
    if (!point) {
      throw new HttpException('Unprocessable Entity', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return point;
  }

  @Put(':id')
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() props: UpdateDto
  ) {
    const point = await this.pointService.update(id, props);
    if (!point) {
      throw new HttpException('Unprocessable Entity', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return point;
  }


  @Put(':id/add-point-of-location/:locationId')
  async addPointOfLocation(@Param('id', new ParseIntPipe()) id: number,
    @Param('locationId', new ParseIntPipe()) locationId: number) {
    const affected = await this.pointService.addPointOfLocation(id, locationId);
    if (!affected) {
      throw new HttpException('Unprocessable Entity', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return affected;
  }

  @Delete(':id/remove-point-of-location/:locationId')
  async removePointOfLocation(@Param('id', new ParseIntPipe()) id: number,
    @Param('locationId', new ParseIntPipe()) locationId: number) {
    const affected = await this.pointService.removePointOfLocation(id, locationId);
    if (!affected) {
      throw new HttpException('Unprocessable Entity', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return affected;
  }


  @Put(':id/add-point-of-equipment/:equipmentId')
  async addPointOfEquipment(@Param('id', new ParseIntPipe()) id: number,
    @Param('equipmentId', new ParseIntPipe()) equipmentId: number) {
    const affected = await this.pointService.addPointOfEquipment(id, equipmentId);
    if (!affected) {
      throw new HttpException('Unprocessable Entity', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return affected;
  }

  @Delete(':id/remove-point-of-equipment/:equipmentId')
  async removePointOfEquipment(@Param('id', new ParseIntPipe()) id: number,
    @Param('equipmentId', new ParseIntPipe()) equipmentId: number) {
    const affected = await this.pointService.removePointOfEquipment(id, equipmentId);
    if (!affected) {
      throw new HttpException('Unprocessable Entity', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return affected;
  }
}
