import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { ModelClass } from 'objection';
import { SensorModel } from '../database/models/sensor.model';
import { LocationModel } from 'src/database/models/location.model';
import { CreateDto, FindDto } from './sensor.dto';
import { PointModel } from 'src/database/models/point.model';

@Injectable()
export class SensorService {

  constructor(@Inject('SensorModel') private modelClass: ModelClass<SensorModel>,
  @Inject('PointModel') private pointModelClass: ModelClass<PointModel>) { }
  
  async findAll(filters: Partial<FindDto>): Promise<SensorModel[]> {
    return  this.modelClass.query()
    .skipUndefined()
    .joinRelated('point')
    .leftJoinRelated('pointOfLocations')
    .leftJoinRelated('pointOfEquipments')
    .where('point.locationId', filters.locationId)
    .andWhere('point.equipmentId', filters.equipmentId)
    .andWhere('pointOfLocations.id', filters.pointOfLocationId)
    .andWhere('pointOfEquipments.id', filters.pointOfEquipmentId)
    .andWhere('deviceId', filters.deviceId)
    .andWhere('sensors.name', 'like',filters.name)
  }

  async findById(id:number): Promise<SensorModel> {
    return  this.modelClass.query()
    .findById(id)
    .withGraphFetched('[point.[location, equipment], pointOfLocations, pointOfEquipments]')
  }

  async create(props: Partial<CreateDto>): Promise<SensorModel> {
    return  this.modelClass.query()
    .insertGraphAndFetch(props);
  }

  async delete(id: number) {
    return this.pointModelClass
      .query()
      .deleteById(id);
  }
}
