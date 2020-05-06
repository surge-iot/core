import { Model } from 'objection';

export class BaseModel extends Model {
  readonly id: number;

  createdAt: Date;
  updatedAt: Date;
}