import { Model } from 'objection';
import { LocationModel } from './location.model';
import { EquipmentModel } from './equipment.model';
import { BaseModel } from './base.model';
import { PointModel } from './point.model';

export class SensorModel extends BaseModel{
  static tableName = 'sensors';

  name: string;
  deviceId: string;
  sensorTypeId: string;
  meta: "json";
  point: PointModel;
  pointOfLocations: LocationModel[];
  pointOfEquipments: EquipmentModel[];

  static relationMappings = {

    point:{ 
      relation: Model.BelongsToOneRelation,
      modelClass: PointModel,
      join:{ 
        from: 'sensors.id', 
        to: 'points.id'
      }
    },
    
    pointOfLocations: {
      relation: Model.ManyToManyRelation,
      modelClass: LocationModel,
      join: {
        from: 'sensors.id',
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
        from: 'sensors.id',
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
      name: { type: 'string' },
      deviceId: { type: 'string' },
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
