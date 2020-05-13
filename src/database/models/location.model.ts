import { BaseModel } from './base.model';
import { Model } from 'objection';
import { LocationClassModel } from './location-class.model';

export class LocationModel extends BaseModel {
  static tableName = 'locations';

  name: string;
  classId: string;
  parentId: number;
  meta: 'json';

  static relationMappings = {
    class: {
      relation: Model.BelongsToOneRelation,
      modelClass: LocationClassModel,
      join: {
        from: 'locations.classId',
        to: 'locationClasses.id'
      }
    },

    parent: {
      relation: Model.BelongsToOneRelation,
      modelClass: LocationModel,
      join: {
        from: 'locations.parentId',
        to: 'locations.id'
      }
    },

    children: {
      relation: Model.HasManyRelation,
      modelClass: LocationModel,
      join: {
        from: 'locations.id',
        to: 'locations.parentId'
      }
    },

    links: {
      relation: Model.ManyToManyRelation,
      modelClass: LocationModel,
      join: {
        from: 'locations.id',
        through: {
          // persons_movies is the join table.
          from: 'locationLinks.parentId',
          to: 'locationLinks.locationId'
        },
        to: 'locations.id'
      }
    }
  };

  static jsonSchema = {
    type: 'object',
    required: ['name', 'classId'],

    properties: {
      id: { type: 'integer' },
      name: { type: 'string' },
      classId: { type: 'string' },
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
