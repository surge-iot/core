import { Model } from 'objection';
import { BaseClassModel } from './base-class.model';

export class LocationClassModel extends BaseClassModel {
  static tableName = 'locationClasses';

  static relationMappings = {
    parent: {
      relation: Model.BelongsToOneRelation,
      modelClass: LocationClassModel,
      join: {
        from: 'locationClasses.parentId',
        to: 'locationClasses.id'
      }
    },

    children: {
      relation: Model.HasManyRelation,
      modelClass: LocationClassModel,
      join: {
        from: 'locationClasses.id',
        to: 'locationClasses.parentId'
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
