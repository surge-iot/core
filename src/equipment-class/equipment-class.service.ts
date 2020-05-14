import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ModelClass, transaction } from 'objection';
import { EquipmentClassModel } from '../database/models/equipment-class.model';
import { CreateDto, FindDto } from './equipment-class.dto';

@Injectable()
export class EquipmentClassService {
  constructor(@Inject('EquipmentClassModel') private modelClass: ModelClass<EquipmentClassModel>) { }

  async findAll(filters: Partial<FindDto>): Promise<EquipmentClassModel[]> {
    return this.modelClass.query()
      .where(filters);
  }

  async findById(id: string) {
    return this.modelClass.query().findById(id);
  }

  async create(props: Partial<CreateDto>): Promise<EquipmentClassModel> {
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
