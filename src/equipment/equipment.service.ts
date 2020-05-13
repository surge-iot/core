import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { EquipmentModel } from '../database/models/equipment.model';
import { ModelClass } from 'objection';
import { CreateDto, UpdateDto, FindDto } from './equipment.dto';

@Injectable()
export class EquipmentService {
  constructor(@Inject('EquipmentModel') private modelClass: ModelClass<EquipmentModel>) { }

  async findAll(filters: Partial<FindDto>): Promise<EquipmentModel[]> {
    return this.modelClass.query()
      .where(filters);
  }

  async findById(id: number) {
    return this.modelClass.query()
      .findById(id)
      .withGraphFetched('[children, links, location, points]');
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

  async addLink(id: number, linkId: number): Promise<number> {
    const equipment = await this.modelClass.query().findById(id);
    const link = await this.modelClass.query().findById(linkId);
    if (!equipment || !link) {
      return null;
    }
    return this.modelClass.relatedQuery('links')
      .for(id)
      .relate(linkId);
  }

  async removeLink(id: number, linkId: number): Promise<number> {
    const equipment = await this.modelClass.query().findById(id);
    const link = await this.modelClass.query().findById(linkId);
    if (!equipment || !link) {
      return null;
    }
    return this.modelClass.relatedQuery('links')
      .for(id)
      .unrelate()
      .where('equipmentId', linkId);
  }
}
