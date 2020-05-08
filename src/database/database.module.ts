import { Global, Module } from '@nestjs/common';
import * as Knex from 'knex';
import { Model } from 'objection';
import { UserModel } from './models/user.model';
import  * as config from '../../knexfile' ;
import { LocationModel } from './models/location.model';
import { EquipmentModel } from './models/equipment.model';
import { SensorModel } from './models/sensor.model';
import { PointModel } from './models/point.model';
const models = [UserModel, LocationModel, EquipmentModel, PointModel, SensorModel];

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
export class DatabaseModule {}
