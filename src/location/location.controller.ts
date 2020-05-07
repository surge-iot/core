import { Controller, Get, Post, Body } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationModel } from '../database/models/location.model';

@Controller('location')
export class LocationController {
  constructor(private locationService: LocationService) { }

  @Get()
  async findAll() {
    return this.locationService.findAll();
  }

  @Post()
  async create(@Body() props: Partial<LocationModel>){
    return this.locationService.create(props);
  }
}
