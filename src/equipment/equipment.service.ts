import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { EquipmentModel } from '../database/models/equipment.model';
import { ModelClass } from 'objection';
import { CreateDto, UpdateDto, FindDto } from './equipment.dto';

@Injectable()
export class EquipmentService {
  constructor(@Inject('EquipmentModel') private modelClass: ModelClass<EquipmentModel>) { }

  async findAll(filters: Partial<FindDto>): Promise<EquipmentModel[]> {
    if(filters.locationId==='null'){
      filters.locationId=null;
    }
    return this.modelClass.query()
      .where(filters).withGraphFetched('[children]');
  }

  async findById(id: number) {
    return this.modelClass.query()
      .findById(id)
      .withGraphFetched('[children, parents, location, points]');
  }
  async findRoots(): Promise<EquipmentModel[]> {
    return this.modelClass.query()
      .leftJoinRelated('parents')
      .where('parent_id', null)
      .withGraphFetched('[children]');
  }
  async findChildren(id: number) {
    return this.modelClass.relatedQuery('children')
    .for(id).withGraphFetched('[children]')
  }

  async findParents(id: number) {
    return this.modelClass.relatedQuery('parents')
    .for(id).withGraphFetched('[children]')
  }

  async create(props: Partial<CreateDto>): Promise<EquipmentModel> {
    return this.modelClass
      .query()
      .insert(props);
  }

  async update(id: number, props: Partial<UpdateDto>) {
    return this.modelClass
      .query()
      .patchAndFetchById(id, props)
  }

  async delete(id: number) {
    return this.modelClass
      .query()
      .deleteById(id)
  }

  async addChild(id: number, childId: number): Promise<number> {
    const equipment = await this.modelClass.query().findById(id);
    const child = await this.modelClass.query().findById(childId);
    if (!equipment || !child) {
      return null;
    }
    return this.modelClass.relatedQuery('children')
      .for(id)
      .relate(childId);
  }

  async removeChild(id: number, childId: number): Promise<number> {
    const equipment = await this.modelClass.query().findById(id);
    const child = await this.modelClass.query().findById(childId);
    if (!equipment || !child) {
      return null;
    }
    return this.modelClass.relatedQuery('children')
      .for(id)
      .unrelate()
      .where('equipmentId', childId);
  }
}
