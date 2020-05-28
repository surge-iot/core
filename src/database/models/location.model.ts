import { BaseModel } from './base.model';
import { Model } from 'objection';
import { LocationClassModel } from './location-class.model';

export class LocationModel extends BaseModel {
  static tableName = 'locations';

  name: string;
  classId: string;
  meta: 'json';

  children: LocationModel[];
  parents: LocationModel[];

  static relationMappings = {
    class: {
      relation: Model.BelongsToOneRelation,
      modelClass: LocationClassModel,
      join: {
        from: 'locations.classId',
        to: 'locationClasses.id'
      }
    },

    children: {
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
    },

    parents: {
      relation: Model.ManyToManyRelation,
      modelClass: LocationModel,
      join: {
        from: 'locations.id',
        through: {
          // persons_movies is the join table.
          from: 'locationLinks.locationId',
          to: 'locationLinks.parentId',
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
