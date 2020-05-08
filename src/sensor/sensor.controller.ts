import { Controller, Get, Query, Body, Post } from '@nestjs/common';
import { SensorService } from './sensor.service';
import { FindDto } from 'src/equipment/equipment.dto';
import { SensorModel } from '../database/models/sensor.model';

@Controller('sensor')
export class SensorController {
  constructor(private sensorService: SensorService) { }

  @Post()
  async create(@Body() props: Partial<SensorModel>) {
    return this.sensorService.create(props);
  }
}
