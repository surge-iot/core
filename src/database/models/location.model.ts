import { BaseModel } from './base.model';
import { Model } from 'objection';

export class LocationModel extends BaseModel {
  static tableName = 'locations';

  name: string;

  static relationMappings = {
    isPartOf: {
      relation: Model.BelongsToOneRelation,
      modelClass: LocationModel,
      join: {
        from: 'locations.isPartOfId',
        to: 'locations.id'
      }
    },

    children: {
      relation: Model.HasManyRelation,
      modelClass: LocationModel,
      join: {
        from: 'locations.id',
        to: 'locations.isPartOfId'
      }
    },

    links: {
      relation: Model.ManyToManyRelation,
      modelClass: LocationModel,
      join: {
        from: 'locations.id',
        through: {
          // persons_movies is the join table.
          from: 'locationLinks.locationId',
          to: 'locationLinks.hasLinkToId'
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
