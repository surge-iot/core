import { BaseModel } from './base.model';

export class UserModel extends BaseModel {
  static tableName = 'users';

  name: string;
  email: string;
  password: string;
  isAdmin: boolean;

  static jsonSchema = {
    type: 'object',
    required: ['name', 'email', 'password'],

    properties: {
      id: { type: 'integer' },
      name: { type: 'string' },
      email: { type: 'string' },
      password: { type: 'string' },
      isAdmin: { type: 'boolean' },
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

  $formatJson(json) {
    // Remember to call the super class's implementation.
    json = super.$formatJson(json);
    // Do your conversion here.
    delete json.password;
    return json;
  }
}