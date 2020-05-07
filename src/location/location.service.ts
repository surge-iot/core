import { Injectable, Inject } from '@nestjs/common';
import { LocationModel } from '../database/models/location.model';
import { ModelClass } from 'objection';

@Injectable()
export class LocationService {
  constructor(@Inject('LocationModel') private modelClass: ModelClass<LocationModel>) { }

  async findAll(): Promise<LocationModel[]> {
    return this.modelClass
    .query()
    .withGraphFetched('[children, links]');
  }

  async create(props: Partial<LocationModel>): Promise<LocationModel> {
    return this.modelClass
      .query()
      .insert(props);
  }
}
