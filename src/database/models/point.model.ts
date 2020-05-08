import { BaseModel } from './base.model';
import { Model } from 'objection';
import { LocationModel } from './location.model';
import { EquipmentModel } from './equipment.model';

export class PointModel extends BaseModel {
  static tableName = 'points';

  locationId: number;
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

    pointOfLocations: {
      relation: Model.ManyToManyRelation,
      modelClass: LocationModel,
      join: {
        from: 'points.id',
        through: {
          // persons_movies is the join table.
          from: 'pointOfLocations.pointId',
          to: 'pointOfLocations.locationId'
        },
        to: 'locations.id'
      }
    },

    pointOfEquipments: {
      relation: Model.ManyToManyRelation,
      modelClass: EquipmentModel,
      join: {
        from: 'points.id',
        through: {
          // persons_movies is the join table.
          from: 'pointOfEquipments.pointId',
          to: 'pointOfEquipments.equipmentId'
        },
        to: 'equipments.id'
      }
    }
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
