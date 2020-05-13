import { BaseModel } from './base.model';
import { Model } from 'objection';
import { LocationModel } from './location.model';
import { EquipmentModel } from './equipment.model';
import { PointClassModel } from './point-class.model';

export class PointModel extends BaseModel {
  static tableName = 'points';

  classId: string;
  locationId: number;
  equipmentId: number;

  static relationMappings = {
    class: {
      relation: Model.BelongsToOneRelation,
      modelClass: PointClassModel,
      join: {
        from: 'equipments.classId',
        to: 'equipmentClasses.id'
      }
    },

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
        from: 'points.equipmentId',
        to: 'equipments.id'
      }
    },

    pointOfLocations: {
      relation: Model.ManyToManyRelation,
      modelClass: LocationModel,
      join: {
        from: 'points.id',
        through: {
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
          from: 'pointOfEquipments.pointId',
          to: 'pointOfEquipments.equipmentId'
        },
        to: 'equipments.id'
      }
    }
  };

  static jsonSchema = {
    type: 'object',
    required: ['classId', 'locationId'],

    properties: {
      id: { type: 'integer' },
      classId: { type: 'string' },
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
