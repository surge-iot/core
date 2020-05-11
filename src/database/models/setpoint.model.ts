import { Model } from 'objection';
import { LocationModel } from './location.model';
import { EquipmentModel } from './equipment.model';
import { BaseModel } from './base.model';
import { PointModel } from './point.model';

export class SetpointModel extends BaseModel {
  static tableName = 'setpoints';
  value: number;
  commandTypeId: string;
  meta: "json";
  point: PointModel;

  static relationMappings = {

    point: {
      relation: Model.BelongsToOneRelation,
      modelClass: PointModel,
      join: {
        from: 'setpoints.id',
        to: 'points.id'
      }
    }
  };

  static jsonSchema = {
    type: 'object',

    properties: {
      value: {type: 'number'},
      commandTypeId: { type: 'string' },
      meta: { type: 'json' },

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
