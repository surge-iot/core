import { BaseModel } from './base.model';
import { Model } from 'objection';
import { LocationModel } from './location.model';
import { DeviceClassModel } from './device-class.model';

export class DeviceModel extends BaseModel {
  static tableName = 'devices';

  serial: string;
  classId: string;
  locationId: number;
  meta: object;

  children: DeviceModel[];
  parents: DeviceModel[];

  static relationMappings = {
    class: {
      relation: Model.BelongsToOneRelation,
      modelClass: DeviceClassModel,
      join: {
        from: 'devices.classId',
        to: 'deviceClasses.id'
      }
    },

    location: {
      relation: Model.BelongsToOneRelation,
      modelClass: LocationModel,
      join: {
        from: 'devices.locationId',
        to: 'locations.id'
      }
    },

    points: {
      relation: Model.ManyToManyRelation,
      modelClass: __dirname + '/point.model',
      join: {
        from: 'devices.id',
        through: {
          // persons_movies is the join table.
          from: 'devicePointMappings.deviceId',
          to: 'devicePointMappings.pointId',
          extra: ['decommissionedAt']
        },
        to: 'points.id'
      }
    }
  };

  static jsonSchema = {
    type: 'object',
    required: ['serial', 'classId', 'locationId'],

    properties: {
      id: { type: 'integer' },
      serial: { type: 'string' },
      classId: { type: 'string' },
      locationId: { type: 'number' },
      parentId: { type: 'number' },
      meta: { type: 'object' },
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
