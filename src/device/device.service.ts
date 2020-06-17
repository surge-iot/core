import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { DeviceModel } from '../database/models/device.model';
import { ModelClass } from 'objection';
import { CreateDto, UpdateDto, FindDto } from './device.dto';
import { PointModel } from 'src/database/models/point.model';

@Injectable()
export class DeviceService {
  constructor(@Inject('DeviceModel') private modelClass: ModelClass<DeviceModel>,
  @Inject('PointModel') private pointModelClass: ModelClass<PointModel>) { }
  
  get deviceModelClass(): ModelClass<DeviceModel> {
    return this.modelClass;
  }
  async findAll(filters: Partial<FindDto>): Promise<DeviceModel[]> {
    if(filters.locationId==='null'){
      filters.locationId=null;
    }
    return this.modelClass.query()
      .where(filters).withGraphFetched('[points]');
  }

  async findById(id: number) {
    return this.modelClass.query()
      .findById(id)
      .withGraphFetched('[location, points]');
  }

  async findBySerial(serial: string) {
    return this.modelClass.query()
      .findOne({serial})
      .withGraphFetched('[location, points]');
  }

  async create(props: Partial<CreateDto>): Promise<DeviceModel> {
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
  async addPoint(id: number, pointId: number): Promise<number> {
    const point = await this.pointModelClass.query().findById(pointId)
    const device = await this.modelClass.query().findById(id);
    if(!point || !device){
      return null;
    }
    return this.modelClass.relatedQuery('points')
      .for(id)
      .relate(pointId);
  }

  async decommissionForPoint(id: number, pointId: number): Promise<number> {
    const point = await this.pointModelClass.query().findById(pointId)
    const device = await this.modelClass.query().findById(id);
    if(!point || !device){
      return null;
    }
    const knex = this.modelClass.knex();
    return knex.raw(`UPDATE device_point_mappings set decommissioned_at=${knex.fn.now()} 
    where device_id=${id} and point_id=${pointId} `);
    // return device.$relatedQuery('points')
    //   .patch({decommissionedAt: new Date()})
    //   .where('points.id', pointId);
  }
}
