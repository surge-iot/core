import { Model } from 'objection';
import { BaseClassModel } from './base-class.model';

export class PointClassModel extends BaseClassModel {
  static tableName = 'pointClasses';

  static relationMappings = {
    parent: {
      relation: Model.BelongsToOneRelation,
      modelClass: PointClassModel,
      join: {
        from: 'pointClasses.parentId',
        to: 'pointClasses.id'
      }
    },

    children: {
      relation: Model.HasManyRelation,
      modelClass: PointClassModel,
      join: {
        from: 'pointClasses.id',
        to: 'pointClasses.parentId'
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
