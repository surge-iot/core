import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ModelClass, transaction } from 'objection';
import { LocationClassModel } from '../database/models/location-class.model';
import { CreateDto, FindDto } from './location-class.dto';

@Injectable()
export class LocationClassService {
  constructor(@Inject('LocationClassModel') private modelClass: ModelClass<LocationClassModel>) { }

  async findAll(filters: Partial<FindDto>): Promise<LocationClassModel[]> {
    return this.modelClass.query()
      .where(filters);
  }

  async findById(id: string) {
    return this.modelClass.query().findById(id);
  }

  async create(props: Partial<CreateDto>): Promise<LocationClassModel> {
    const id = `${props.parentId || ''}.${props.name.toUpperCase().replace(/\s/g, "")}`;
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
