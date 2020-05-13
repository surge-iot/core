import { Controller, Get, Post, Body, Param, ParseIntPipe, Put, Delete, HttpException, HttpStatus, Query } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateDto, UpdateDto, FindDto } from './location.dto';

@Controller('location')
export class LocationController {
  constructor(private locationService: LocationService) { }

  @Get()
  async findAll(@Query() filters: FindDto) {
    return this.locationService.findAll(filters);
  }

  @Get(':id')
  async findById(@Param('id', new ParseIntPipe()) id: number) {
    const location = await this.locationService.findById(id);
    if (!location) {
      throw new HttpException('Unprocessable Entity', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return location;
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
    const location = await this.locationService.update(id, props);
    if (!location) {
      throw new HttpException('Unprocessable Entity', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return location;
  }

  @Delete(':id')
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    const affected = await this.locationService.delete(id);
    if (!affected) {
      throw new HttpException('Unprocessable Entity', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return affected;
  }

  @Put(':id/add-link/:linkId')
  async addLink(@Param('id', new ParseIntPipe()) id: number,
    @Param('linkId', new ParseIntPipe()) linkId: number) {
    const affected = await this.locationService.addLink(id, linkId);
    console.log(affected)
    if (!affected) {
      throw new HttpException('Unprocessable Entity', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return affected;
  }

  @Delete(':id/remove-link/:linkId')
  async removeLink(@Param('id', new ParseIntPipe()) id: number,
    @Param('linkId', new ParseIntPipe()) linkId: number) {
    const affected = await this.locationService.removeLink(id, linkId);
    if (!affected) {
      throw new HttpException('Unprocessable Entity', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return affected;
  }
}
