import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { LocationModel } from '../database/models/location.model';
import { ModelClass } from 'objection';
import { CreateDto, UpdateDto, FindDto } from './location.dto';

@Injectable()
export class LocationService {
  constructor(@Inject('LocationModel') private modelClass: ModelClass<LocationModel>) { }

  async findAll(filters: Partial<FindDto>): Promise<LocationModel[]> {
    return this.modelClass.query()
      .where(filters)
      .withGraphFetched('[children]');
  }

  async findById(id: number) {
    return this.modelClass.query()
      .findById(id)
      .withGraphFetched('[children, parents]');
  }

  async findChildren(id: number) {
    return this.modelClass.relatedQuery('children')
    .for(id).withGraphFetched('[children]')
  }

  async findParents(id: number) {
    return this.modelClass.relatedQuery('parents')
    .for(id).withGraphFetched('[children]')
  }

  async create(props: Partial<CreateDto>): Promise<LocationModel> {
    return this.modelClass
      .query()
      .insert(props);
  }

  async update(id: number, props: Partial<UpdateDto>) {
    return this.modelClass
      .query()
      .patchAndFetchById(id, props);
  }

  async delete(id: number) {
    return this.modelClass
      .query()
      .deleteById(id)
  }

  async addChild(id: number, childId: number): Promise<number> {
    const location = await this.modelClass.query().findById(id);
    const child = await this.modelClass.query().findById(childId);
    if (!location || !child) {
      return null;
    }
    return this.modelClass.relatedQuery('children')
      .for(id)
      .relate(childId);
  }

  async removeChild(id: number, childId: number): Promise<number> {
    const location = await this.modelClass.query().findById(id);
    const child = await this.modelClass.query().findById(childId);
    if (!location || !child) {
      return null;
    }
    return this.modelClass.relatedQuery('children')
      .for(id)
      .unrelate()
      .where('locationId', childId);
  }
}
