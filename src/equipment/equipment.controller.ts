import { Controller, Get, Param, ParseIntPipe, Post, Put, Body, Delete, Query } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { CreateDto, FindDto, UpdateDto } from './equipment.dto';

@Controller('equipment')
export class EquipmentController {
  constructor(private equipmentService: EquipmentService) { }
  
  @Get(':id')
  async findAll(@Query() filters: FindDto) {
    return this.equipmentService.findAll(filters);
  }

  @Get(':id')
  async findById(@Param('id', new ParseIntPipe()) id: number) {
    return this.equipmentService.findById(id);
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
    return this.equipmentService.update(id, props);
  }

  @Delete(':id')
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    return this.equipmentService.delete(id);
  }

  @Put(':id/add-link/:linkId')
  async addLink(@Param('id', new ParseIntPipe()) id: number,
    @Param('linkId', new ParseIntPipe()) linkId: number) {
      return this.equipmentService.addLink(id, linkId);
  }

  @Delete(':id/remove-link/:linkId')
  async removeLink(@Param('id', new ParseIntPipe()) id: number,
    @Param('linkId', new ParseIntPipe()) linkId: number) {
      return this.equipmentService.removeLink(id, linkId);
  }
}
