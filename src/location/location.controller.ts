import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationModel } from '../database/models/location.model';
import { CreateDto } from './location.dto';

@Controller('location')
export class LocationController {
  constructor(private locationService: LocationService) { }

  @Get(':id')
  async findById(@Param('id', new ParseIntPipe()) id: number) {
    return this.locationService.findById(id);
  }

  @Post()
  async create(@Body() props: CreateDto){
    return this.locationService.create(props);
  }
}
