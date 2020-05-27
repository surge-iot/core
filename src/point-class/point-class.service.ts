import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ModelClass, transaction } from 'objection';
import { PointClassModel } from '../database/models/point-class.model';
import { CreateDto, FindDto } from './point-class.dto';

@Injectable()
export class PointClassService {
  constructor(@Inject('PointClassModel') private modelClass: ModelClass<PointClassModel>) { }

  async findAll(filters: Partial<FindDto>): Promise<PointClassModel[]> {
    return this.modelClass.query()
      .where(filters).withGraphFetched('[children]');
  }

  async findById(id: string) {
    return this.modelClass.query().findById(id).withGraphFetched('[children]');
  }

  async create(props: Partial<CreateDto>): Promise<PointClassModel> {
    const id = `${props.parentId? props.parentId+'.' : ''}${props.name.toUpperCase().replace(/\s/g, "")}`;
    return this.modelClass
      .query()
      .insert({id, ...props});
  }

  async delete(id: string) {
    return this.modelClass
      .query()
      .deleteById(id)
  }
}
