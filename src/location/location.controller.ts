import { Controller, Get, Post, Body, Param, ParseIntPipe, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationModel } from '../database/models/location.model';
import { CreateDto, UpdateDto } from './location.dto';

@Controller('location')
export class LocationController {
  constructor(private locationService: LocationService) { }

  @Get(':id')
  async findById(@Param('id', new ParseIntPipe()) id: number) {
    return this.locationService.findById(id);
  }

  @Post()
  async create(@Body() props: CreateDto) {
    return this.locationService.create(props);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() props: UpdateDto
  ) {
    return this.locationService.update(id, props);
  }

  @Delete(':id')
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    return this.locationService.delete(id);
  }

  @Put(':id/change-parent/:newParentId')
  async changeParent(@Param('id', new ParseIntPipe()) id: number,
    @Param('newParentId', new ParseIntPipe()) newParentId: number) {
    return this.locationService.changeParent(id, newParentId);
  }

  @Post(':id/add-link/:linkId')
  async addLink(@Param('id', new ParseIntPipe()) id: number,
    @Param('linkId', new ParseIntPipe()) linkId: number) {
      return this.locationService.addLink(id, linkId);
  }

  @Post(':id/remove-link/:linkId')
  async removeLink(@Param('id', new ParseIntPipe()) id: number,
    @Param('linkId', new ParseIntPipe()) linkId: number) {
      return this.locationService.removeLink(id, linkId);
  }
}
