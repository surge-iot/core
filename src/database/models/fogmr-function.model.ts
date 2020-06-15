import { BaseModel } from './base.model';

export class FogmrFunctionModel extends BaseModel {
  static tableName = 'fogmrFunctions';

  name: string;
  image: string;
  meta: object;

  static relationMappings = {
    
  };

  static jsonSchema = {
    type: 'object',
    required: ['name', 'image'],

    properties: {
      id: { type: 'integer' },
      name: { type: 'string' },
      image: { type: 'string' },
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
