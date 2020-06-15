import { BaseModel } from './base.model';
import { Model } from 'objection';
import { FogmrTaskModel } from './fogmr-task.model';
import { DeviceModel } from './device.model';

export class FogmrReducerModel extends BaseModel {
  static tableName = 'fogmrReducers';

  task: FogmrTaskModel;
  outputDevice: DeviceModel;
  executor: DeviceModel;
  active: boolean;
  meta: object;

  static relationMappings = {
    task: {
      relation: Model.BelongsToOneRelation,
      modelClass: FogmrTaskModel,
      join: {
        from: 'fogmrReducers.taskId',
        to: 'fogmrTasks.id'
      }
    },  
    outputDevice: {
      relation: Model.BelongsToOneRelation,
      modelClass: DeviceModel,
      join: {
        from: 'fogmrReducers.inputDeviceId',
        to: 'devices.id'
      }
    }, 
    executor: {
      relation: Model.BelongsToOneRelation,
      modelClass: DeviceModel,
      join: {
        from: 'fogmrReducers.executorId',
        to: 'devices.id'
      }
    },  
  };

  static jsonSchema = {
    type: 'object',
    required: ['taskId', 'outputDeviceId'],

    properties: {
      id: { type: 'integer' },
      taskId: { type: 'integer' },
      outputDeviceId: { type: 'integer' },
      executorId: { type: 'integer' },
      active: { type: 'boolean' },
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
