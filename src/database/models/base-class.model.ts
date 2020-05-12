import { Model } from 'objection';

export class BaseClassModel extends Model {
  id: string;
  name: string;
  parentId: string;
  createdAt: Date;
  updatedAt: Date;
}
