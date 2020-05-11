import { BaseModel } from './base.model';
import { Model } from 'objection';
import { LocationModel } from './location.model';

export class EquipmentModel extends BaseModel {
  static tableName = 'equipments';

  name: string;
  parentId: number;
  locationId: number;
  meta: 'json';

  static relationMappings = {
    parent: {
      relation: Model.BelongsToOneRelation,
      modelClass: EquipmentModel,
      join: {
        from: 'equipments.parentId',
        to: 'equipments.id'
      }
    },

    children: {
      relation: Model.HasManyRelation,
      modelClass: EquipmentModel,
      join: {
        from: 'equipments.id',
        to: 'equipments.parentId'
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

    links: {
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

    points:{ 
      relation: Model.HasManyRelation,
      modelClass:  __dirname + '/point.model',
      join: {
        from: 'equipments.id',
        to: 'points.equipmentId'
      }
    },

    commandsForEquipment:{ 
      relation: Model.ManyToManyRelation,
      modelClass:  __dirname + '/command.model',
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
    required: ['name', 'locationId'],

    properties: {
      id: { type: 'integer' },
      name: { type: 'string' },
      locationId: { type: 'number' },
      parentId: { type: 'number' },
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
