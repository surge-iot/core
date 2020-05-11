import { BaseModel } from './base.model';
import { Model } from 'objection';
import { LocationModel } from './location.model';
import { EquipmentModel } from './equipment.model';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class PointModel extends BaseModel {
  static tableName = 'points';
  
  @IsNotEmpty()
  locationId: number;
  @IsOptional()
  equipmentId: number;

  static relationMappings = {
    location: {
      relation: Model.BelongsToOneRelation,
      modelClass: LocationModel,
      join: {
        from: 'points.locationId',
        to: 'locations.id'
      }
    },

    equipment: {
      relation: Model.HasManyRelation,
      modelClass: EquipmentModel,
      join: {
        from: 'points.id',
        to: 'equipments.parentId'
      }
    },

    sensor: {
      relation: Model.HasOneRelation,
      modelClass:  __dirname + '/sensor.model',
      join: {
        from: 'points.id',
        to: 'sensors.id'
      }
    },
    command: {
      relation: Model.HasOneRelation,
      modelClass:  __dirname + '/command.model',
      join: {
        from: 'points.id',
        to: 'commands.id'
      }
    },
    setpoint: {
      relation: Model.HasOneRelation,
      modelClass:  __dirname + '/setpoint.model',
      join: {
        from: 'points.id',
        to: 'setpoints.id'
      }
    },

  };

  static jsonSchema = {
    type: 'object',

    properties: {
      id: { type: 'integer' },
      locationId: { type: 'integer' },
      equipmentId: { type: 'integer' },
      createdAt: {
        type: 'string',
        format: 'date-time'
      },
      updatedAt: {
        type: 'string',
        format: 'date-time'
      }
    },
  };

}
