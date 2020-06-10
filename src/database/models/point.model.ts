import { BaseModel } from './base.model';
import { Model } from 'objection';
import { LocationModel } from './location.model';
import { EquipmentModel } from './equipment.model';
import { PointClassModel } from './point-class.model';

export class PointModel extends BaseModel {
  static tableName = 'points';

  name: string;
  classId: string;
  locationId: number;
  equipmentId: number;
  meta:object;
  pointOfLocations: LocationModel[];
  pointOfEquipments: EquipmentModel[];

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
    },

    devices: {
      relation: Model.ManyToManyRelation,
      modelClass: __dirname + '/device.model',
      join: {
        from: 'points.id',
        through: {
          // persons_movies is the join table.
          from: 'devicePointMappings.pointId',
          to: 'devicePointMappings.deviceId',
          extra: ['decommissionedAt']
        },
        to: 'devices.id'
      }
    }
  };

  static jsonSchema = {
    type: 'object',
    required: ['classId', 'locationId'],

    properties: {
      id: { type: 'integer' },
      name: { type: 'string' },
      classId: { type: 'string' },
      locationId: { type: 'integer' },
      equipmentId: { type: 'integer' },
      meta: {type:'object'},
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
