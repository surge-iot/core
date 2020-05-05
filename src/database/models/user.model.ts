import { BaseModel } from './base.model';

export class UserModel extends BaseModel {
  static tableName = 'users';

  name: string;
  email: string;
  password: string;
}