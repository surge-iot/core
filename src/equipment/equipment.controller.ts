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

  @Get(':id')
  async findById(@Param('id', new ParseIntPipe()) id: number) {
    const equipment = await this.equipmentService.findById(id);
    if (!equipment) {
      throw new HttpException('Unprocessable Entity', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return equipment;
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

  @Put(':id/add-link/:linkId')
  async addLink(@Param('id', new ParseIntPipe()) id: number,
    @Param('linkId', new ParseIntPipe()) linkId: number) {
      const affected = await this.equipmentService.addLink(id, linkId);
      if (!affected) {
        throw new HttpException('Unprocessable Entity', HttpStatus.UNPROCESSABLE_ENTITY);
      }
      return affected;
  }

  @Delete(':id/remove-link/:linkId')
  async removeLink(@Param('id', new ParseIntPipe()) id: number,
    @Param('linkId', new ParseIntPipe()) linkId: number) {
      const affected = await this.equipmentService.removeLink(id, linkId);
      if (!affected) {
        throw new HttpException('Unprocessable Entity', HttpStatus.UNPROCESSABLE_ENTITY);
      }
      return affected;
  }
}
