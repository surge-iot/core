import { Injectable, Inject } from '@nestjs/common';
import { ModelClass } from 'objection';
import { SensorModel } from '../database/models/sensor.model';

@Injectable()
export class SensorService {

  constructor(@Inject('SensorModel') private modelClass: ModelClass<SensorModel>) { }
  
  async create(props): Promise<SensorModel> {
    return  this.modelClass.query()
    .insertGraph({
      name:props.name,
      point:{ 
        locationId:props.locationId
      }
    });
  }
}
