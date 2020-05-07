import { BaseModel } from './base.model';
import { Model } from 'objection';

export class LocationModel extends BaseModel {
  static tableName = 'locations';

  name: string;
  parentId: number;
  meta: 'json';

  static relationMappings = {
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
    required: ['name'],

    properties: {
      id: { type: 'integer' },
      name: { type: 'string' },
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
