import { Model } from 'objection';
import { BaseClassModel } from './base-class.model';

export class EquipmentClassModel extends BaseClassModel {
  static tableName = 'equipmentClasses';

  static relationMappings = {
    parent: {
      relation: Model.BelongsToOneRelation,
      modelClass: EquipmentClassModel,
      join: {
        from: 'equipmentClasses.parentId',
        to: 'equipmentClasses.id'
      }
    },

    children: {
      relation: Model.HasManyRelation,
      modelClass: EquipmentClassModel,
      join: {
        from: 'equipmentClasses.id',
        to: 'equipmentClasses.parentId'
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
