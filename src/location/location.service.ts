import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
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

  async addLink(id: number, linkId: number): Promise<number> {
    const location = await this.modelClass.query().findById(id);
    const link = await this.modelClass.query().findById(linkId);
    if (!location || !link) {
      return null;
    }
    return this.modelClass.relatedQuery('links')
      .for(id)
      .relate(linkId);
  }

  async removeLink(id: number, linkId: number): Promise<number> {
    const location = await this.modelClass.query().findById(id);
    const link = await this.modelClass.query().findById(linkId);
    if (!location || !link) {
      return null;
    }
    return this.modelClass.relatedQuery('links')
      .for(id)
      .unrelate()
      .where('locationId', linkId);
  }
}
