import { Controller, Get, Param, ParseIntPipe, Post, Put, Body, Delete, Query, HttpException, HttpStatus } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { CreateDto, FindDto, UpdateDto } from './equipment.dto';

@Controller('equipment')
export class EquipmentController {
  constructor(private equipmentService: EquipmentService) { }
  
  @Get()
  async findAll(@Query() filters: FindDto) {
    return this.equipmentService.findAll(filters);
  }

  @Get('roots')
  async findRoots() {
    return this.equipmentService.findRoots();
  }

  @Get(':id')
  async findById(@Param('id', new ParseIntPipe()) id: number) {
    const equipment = await this.equipmentService.findById(id);
    if (!equipment) {
      throw new HttpException('Unprocessable Entity', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return equipment;
  }

  @Get(':id/children')
  async findChildren(@Param('id', new ParseIntPipe()) id: number) {
    return this.equipmentService.findChildren(id);
  }
  @Get(':id/parents')
  async findParents(@Param('id', new ParseIntPipe()) id: number) {
    return this.equipmentService.findParents(id);
  }

  @Post()
  async create(@Body() props: CreateDto) {
    return this.equipmentService.create(props);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() props: UpdateDto
  ) {
    const equipment = await this.equipmentService.update(id, props);
    if (!equipment) {
      throw new HttpException('Unprocessable Entity', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return equipment;
  }

  @Delete(':id')
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    const affected = await this.equipmentService.delete(id);
    if (!affected) {
      throw new HttpException('Unprocessable Entity', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return affected;
  }

  @Put(':id/add-child/:childId')
  async addChild(@Param('id', new ParseIntPipe()) id: number,
    @Param('childId', new ParseIntPipe()) childId: number) {
      const affected = await this.equipmentService.addChild(id, childId);
      if (!affected) {
        throw new HttpException('Unprocessable Entity', HttpStatus.UNPROCESSABLE_ENTITY);
      }
      return affected;
  }

  @Delete(':id/remove-child/:childId')
  async removeChild(@Param('id', new ParseIntPipe()) id: number,
    @Param('childId', new ParseIntPipe()) childId: number) {
      const affected = await this.equipmentService.removeChild(id, childId);
      if (!affected) {
        throw new HttpException('Unprocessable Entity', HttpStatus.UNPROCESSABLE_ENTITY);
      }
      return affected;
  }
}
