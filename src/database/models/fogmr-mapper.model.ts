import { BaseModel } from './base.model';
import { Model } from 'objection';
import { FogmrTaskModel } from './fogmr-task.model';
import { DeviceModel } from './device.model';

export class FogmrMapperModel extends BaseModel {
  static tableName = 'fogmrMappers';

  task: FogmrTaskModel;
  inputDevice: DeviceModel;
  executor: DeviceModel;
  active: boolean;
  meta: object;

  static relationMappings = {
    task: {
      relation: Model.BelongsToOneRelation,
      modelClass: FogmrTaskModel,
      join: {
        from: 'fogmrMappers.taskId',
        to: 'fogmrTasks.id'
      }
    },  
    inputDevice: {
      relation: Model.BelongsToOneRelation,
      modelClass: DeviceModel,
      join: {
        from: 'fogmrMappers.inputDeviceId',
        to: 'devices.id'
      }
    },    
    executor: {
      relation: Model.BelongsToOneRelation,
      modelClass: DeviceModel,
      join: {
        from: 'fogmrMappers.executorId',
        to: 'devices.id'
      }
    },  
  };

  static jsonSchema = {
    type: 'object',
    required: ['taskId', 'inputDeviceId'],

    properties: {
      id: { type: 'integer' },
      taskId: { type: 'integer' },
      inputDeviceId: { type: 'integer' },
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
