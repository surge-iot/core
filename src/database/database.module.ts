import { Global, Module } from '@nestjs/common';
import * as Knex from 'knex';
import { Model } from 'objection';
import { UserModel } from './models/user.model';
import * as config from '../../knexfile';
import { LocationModel } from './models/location.model';
import { EquipmentModel } from './models/equipment.model';
import { PointModel } from './models/point.model';
import { LocationClassModel } from './models/location-class.model';
import { EquipmentClassModel } from './models/equipment-class.model';
import { PointClassModel } from './models/point-class.model';
import { DeviceClassModel } from './models/device-class.model';
import { DeviceModel } from './models/device.model';
import { FogmrTaskModel } from './models/fogmr-task.model';
import { FogmrReducerModel } from './models/fogmr-reducer.model';
import { FogmrMapperModel } from './models/fogmr-mapper.model';
import { FogmrFunctionModel } from './models/fogmr-function.model';
const models = [UserModel,
  LocationClassModel,
  EquipmentClassModel,
  PointClassModel,
  DeviceClassModel,
  LocationModel,
  EquipmentModel,
  PointModel,
  DeviceModel,
  FogmrFunctionModel,
  FogmrTaskModel,
  FogmrReducerModel,
  FogmrMapperModel,
];

const modelProviders = models.map(model => {
  return {
    provide: model.name,
    useValue: model
  };
});

const providers = [
  ...modelProviders,
  {
    provide: 'KnexConnection',
    useFactory: async () => {
      const knex = Knex(config);

      Model.knex(knex);
      return knex;
    }
  }
];

@Global()
@Module({
  providers: [...providers],
  exports: [...providers]
})
export class DatabaseModule { }
