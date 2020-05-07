import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { LocationModel } from '../database/models/location.model';
import { ModelClass } from 'objection';
import { CreateDto, UpdateDto } from './location.dto';

@Injectable()
export class LocationService {
  constructor(@Inject('LocationModel') private modelClass: ModelClass<LocationModel>) { }

  async findById(id: number) {
    const location = await this.modelClass.query()
      .findById(id)
      .withGraphFetched('[children, links]');
    if (!location) {
      throw new HttpException('Resource not found', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return location;
  }

  async create(props: Partial<CreateDto>): Promise<LocationModel> {
    return this.modelClass
      .query()
      .insert(props);
  }

  async update(id: number, props: Partial<UpdateDto>) {
    const location = await this.modelClass
      .query()
      .patchAndFetchById(id, props)
    if (!location) {
      throw new HttpException('Resource not found', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return location;
  }

  async delete(id: number) {
    const location = await this.modelClass
      .query()
      .delete()
      .where({ id })
      .first();
    if (!location) {
      throw new HttpException('Resource not found', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return location;
  }

  async changeParent(id: number, parentId: number): Promise<LocationModel> {
    const location = await this.modelClass
      .query()
      .patchAndFetchById(id, { parentId });
    if (!location) {
      throw new HttpException('Resource not found', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return location;
  }

  async addLink(id: number, linkId: number): Promise<LocationModel> {
    const location = await this.findById(id);
    const link = await this.findById(linkId);
    const affected = await this.modelClass.relatedQuery('links')
      .for(id)
      .relate(linkId);
    if (!affected) {
      throw new HttpException('Resource not found', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return this.findById(id);
  }

  async removeLink(id: number, linkId: number): Promise<LocationModel> {
    const location = await this.findById(id);
    const link = await this.findById(linkId);
    const affected = await this.modelClass.relatedQuery('links')
      .for(id)
      .unrelate()
      .where('locationId', linkId);
    if (!affected) {
      throw new HttpException('Resource not found', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return this.findById(id);
  }
}
