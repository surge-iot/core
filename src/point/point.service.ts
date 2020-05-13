import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { ModelClass } from 'objection';
import { PointModel } from '../database/models/point.model';
import { LocationModel } from '../database/models/location.model';
import { CreateDto, FindDto, UpdateDto } from './point.dto';
import { EquipmentModel } from '../database/models/equipment.model';

@Injectable()
export class PointService {

  constructor(@Inject('PointModel') private modelClass: ModelClass<PointModel>,
    @Inject('EquipmentModel') private equipmentModelClass: ModelClass<EquipmentModel>,
    @Inject('LocationModel') private locationModelClass: ModelClass<LocationModel>) { }

  async findAll(filters: Partial<FindDto>): Promise<PointModel[]> {
    return this.modelClass.query()
      .skipUndefined()
      .leftJoinRelated('pointOfLocations')
      .leftJoinRelated('pointOfEquipments')
      .where('locationId', filters.locationId)
      .andWhere('equipmentId', filters.equipmentId)
      .andWhere('pointOfLocations.id', filters.pointOfLocationId)
      .andWhere('pointOfEquipments.id', filters.pointOfEquipmentId)
      .andWhere('classId', filters.classId)
  }

  async findById(id: number): Promise<PointModel> {
    return this.modelClass.query()
      .findById(id)
      .withGraphFetched('[location, equipment, pointOfLocations, pointOfEquipments]')
  }

  async create(props: Partial<CreateDto>): Promise<PointModel> {
    return this.modelClass.query()
      .insert(props);
  }

  async delete(id: number) {
    return this.modelClass.query()
      .deleteById(id);
  }

  async update(id: number, props: Partial<UpdateDto>) {
    return this.modelClass.query()
      .patchAndFetchById(id, props)
  }

  async addPointOfLocation(id: number, locationId: number): Promise<number> {
    const point = await this.modelClass.query().findById(id)
    const location = await this.locationModelClass.query().findById(locationId)
    if(!point || !location){
      return null;
    }
    return this.modelClass.relatedQuery('pointOfLocations')
      .for(id)
      .relate(locationId);
  }

  async removePointOfLocation(id: number, locationId: number): Promise<number> {
    const point = await this.modelClass.query().findById(id)
    const location = await this.locationModelClass.query().findById(locationId)
    if(!point || !location){
      return null;
    }
    return this.modelClass.relatedQuery('pointOfLocations')
      .for(id)
      .unrelate()
      .where('locationId', locationId);
  }

  async addPointOfEquipment(id: number, equipmentId: number): Promise<number> {
    const point = await this.modelClass.query().findById(id)
    const equipment = await this.equipmentModelClass.query().findById(equipmentId)
    if(!point || !equipment){
      return null;
    }
    return this.modelClass.relatedQuery('pointOfEquipments')
      .for(id)
      .relate(equipmentId);
  }

  async removePointOfEquipment(id: number, equipmentId: number): Promise<number> {
    const point = await this.modelClass.query().findById(id)
    const equipment = await this.equipmentModelClass.query().findById(equipmentId)
    if(!point || !equipment){
      return null;
    }
    return this.modelClass.relatedQuery('pointOfEquipments')
      .for(id)
      .unrelate()
      .where('equipmentId', equipmentId);
  }
}
