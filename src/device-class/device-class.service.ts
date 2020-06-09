import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ModelClass, transaction } from 'objection';
import { DeviceClassModel } from '../database/models/device-class.model';
import { CreateDto, FindDto } from './device-class.dto';

@Injectable()
export class DeviceClassService {
  constructor(@Inject('DeviceClassModel') private modelClass: ModelClass<DeviceClassModel>) { }

  async findAll(filters: Partial<FindDto>): Promise<DeviceClassModel[]> {
    return this.modelClass.query()
      .where(filters).withGraphFetched('[children]');
  }

  async findById(id: string) {
    return this.modelClass.query().findById(id).withGraphFetched('[children]');
  }

  async create(props: Partial<CreateDto>): Promise<DeviceClassModel> {
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
