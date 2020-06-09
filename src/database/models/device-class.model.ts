import { Model } from 'objection';
import { BaseClassModel } from './base-class.model';

export class DeviceClassModel extends BaseClassModel {
  static tableName = 'deviceClasses';
  id:string;
  name: string;
  meta:object;
  static relationMappings = {
    parent: {
      relation: Model.BelongsToOneRelation,
      modelClass: DeviceClassModel,
      join: {
        from: 'deviceClasses.parentId',
        to: 'deviceClasses.id'
      }
    },

    children: {
      relation: Model.HasManyRelation,
      modelClass: DeviceClassModel,
      join: {
        from: 'deviceClasses.id',
        to: 'deviceClasses.parentId'
      }
    },
  };

  static jsonSchema = {
    type: 'object',
    required: ['id', 'name'],

    properties: {
      id: { type: 'string' },
      name: { type: 'string' },
      parentId: { type: 'string' },
      meta: { type: 'object'},
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
