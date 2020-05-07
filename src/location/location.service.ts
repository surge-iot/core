import { Injectable, Inject } from '@nestjs/common';
import { LocationModel } from '../database/models/location.model';
import { ModelClass } from 'objection';
import { CreateDto, UpdateDto } from './location.dto';

@Injectable()
export class LocationService {
  constructor(@Inject('LocationModel') private modelClass: ModelClass<LocationModel>) { }

  async findById(id: number) {
    return this.modelClass.query()
      .findById(id)
      .withGraphFetched('[children, links]');
  }

  async create(props: Partial<CreateDto>): Promise<LocationModel> {
    return this.modelClass
      .query()
      .insert(props);
  }

  update(id: number, props: Partial<UpdateDto>) {
    return this.modelClass
      .query()
      .patch(props)
      .where({ id })
      .returning('*')
      .first();
  }

  delete(id: number) {
    return this.modelClass
      .query()
      .delete()
      .where({ id })
      .returning('*')
      .first();
  }
}
