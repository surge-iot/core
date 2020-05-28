import { BaseModel } from './base.model';
import { Model } from 'objection';
import { LocationModel } from './location.model';
import { EquipmentClassModel } from './equipment-class.model';

export class EquipmentModel extends BaseModel {
  static tableName = 'equipments';

  name: string;
  classId: string;
  locationId: number;
  meta: 'json';

  children: EquipmentModel[];
  parents: EquipmentModel[];

  static relationMappings = {
    class: {
      relation: Model.BelongsToOneRelation,
      modelClass: EquipmentClassModel,
      join: {
        from: 'equipments.classId',
        to: 'equipmentClasses.id'
      }
    },

    location: {
      relation: Model.BelongsToOneRelation,
      modelClass: LocationModel,
      join: {
        from: 'equipments.locationId',
        to: 'locations.id'
      }
    },

    children: {
      relation: Model.ManyToManyRelation,
      modelClass: EquipmentModel,
      join: {
        from: 'equipments.id',
        through: {
          // persons_movies is the join table.
          from: 'equipmentLinks.parentId',
          to: 'equipmentLinks.equipmentId'
        },
        to: 'equipments.id'
      }
    },


    parents: {
      relation: Model.ManyToManyRelation,
      modelClass: EquipmentModel,
      join: {
        from: 'equipments.id',
        through: {
          // persons_movies is the join table.
          from: 'equipmentLinks.equipmentId',
          to: 'equipmentLinks.parentId',
        },
        to: 'equipments.id'
      }
    },
    points: {
      relation: Model.HasManyRelation,
      modelClass: __dirname + '/point.model',
      join: {
        from: 'equipments.id',
        to: 'points.equipmentId'
      }
    },

    pointsOfEquipment: {
      relation: Model.ManyToManyRelation,
      modelClass: __dirname + '/command.model',
      join: {
        from: 'equipments.id',
        through: {
          // persons_movies is the join table.
          from: 'pointOfEquipments.equipmentId',
          to: 'pointOfEquipments.pointId'
        },
        to: 'commands.id'
      }
    }
  };

  static jsonSchema = {
    type: 'object',
    required: ['name', 'classId', 'locationId'],

    properties: {
      id: { type: 'integer' },
      name: { type: 'string' },
      classId: { type: 'string' },
      locationId: { type: 'number' },
      parentId: { type: 'number' },
      meta: { type: 'object' },
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
