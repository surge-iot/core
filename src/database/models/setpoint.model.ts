import { Model } from 'objection';
import { LocationModel } from './location.model';
import { EquipmentModel } from './equipment.model';
import { BaseModel } from './base.model';
import { PointModel } from './point.model';

export class CommandModel extends BaseModel {
  static tableName = 'setpoints';

  commandTypeId: string;
  meta: "json";
  point: PointModel;
  pointOfLocations: LocationModel[];
  pointOfEquipments: EquipmentModel[];

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
