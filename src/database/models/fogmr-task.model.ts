import { BaseModel } from './base.model';
import { Model } from 'objection';
import { FogmrFunctionModel } from './fogmr-function.model';
import { FogmrMapperModel } from './fogmr-mapper.model';

export class FogmrTaskModel extends BaseModel {
  static tableName = 'fogmrTasks';

  meta: object;
  fogmrFunction: FogmrFunctionModel;
  mappers: FogmrMapperModel[];

  static relationMappings = {
    fogmrFunction: {
      relation: Model.BelongsToOneRelation,
      modelClass: FogmrFunctionModel,
      join: {
        from: 'fogmrTasks.functionId',
        to: 'fogmrFunctions.id'
      }
    },  
    mappers:{ 
      relation: Model.HasManyRelation,
      modelClass: __dirname + '/fogmr-mapper.model',
      join:{ 
        from: 'fogmrTasks.id',
        to: 'fogmrMappers.taskId'
      }
    },
    reducer:{ 
      relation: Model.HasOneRelation,
      modelClass: __dirname + '/fogmr-reducer.model',
      join:{ 
        from: 'fogmrTasks.id',
        to: 'fogmrReducers.taskId'
      }
    }  
  };

  static jsonSchema = {
    type: 'object',
    required: ['functionId'],

    properties: {
      id: { type: 'integer' },
      functionId: { type: 'integer' },
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
