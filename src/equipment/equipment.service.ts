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
    const equipment = await this.modelClass.query()
      .findById(id)
      .withGraphFetched('[children, links, location]');
    if (!equipment) {
      throw new HttpException('Resource not found', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return equipment;
  }

  async create(props: Partial<CreateDto>): Promise<EquipmentModel> {
    return this.modelClass
      .query()
      .insert(props);
  }

  async update(id: number, props: Partial<UpdateDto>) {
    const equipment = await this.modelClass
      .query()
      .patchAndFetchById(id, props)
    if (!equipment) {
      throw new HttpException('Resource not found', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return equipment;
  }

  async delete(id: number) {
    const equipment = await this.modelClass
      .query()
      .delete()
      .where({ id })
      .first();
    if (!equipment) {
      throw new HttpException('Resource not found', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return equipment;
  }

  async addLink(id: number, linkId: number): Promise<EquipmentModel> {
    await this.findById(id);
    await this.findById(linkId);
    const affected = await this.modelClass.relatedQuery('links')
      .for(id)
      .relate(linkId);
    if (!affected) {
      throw new HttpException('Resource not found', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return this.findById(id);
  }

  async removeLink(id: number, linkId: number): Promise<EquipmentModel> {
    await this.findById(id);
    await this.findById(linkId);
    const affected = await this.modelClass.relatedQuery('links')
      .for(id)
      .unrelate()
      .where('equipmentId', linkId);
    if (!affected) {
      throw new HttpException('Resource not found', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return this.findById(id);
  }
}
