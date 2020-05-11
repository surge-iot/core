import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { ModelClass } from 'objection';
import { CommandModel } from '../database/models/command.model';
import { LocationModel } from '../database/models/location.model';
import { CreateDto, FindDto, UpdateDto } from './command.dto';
import { PointModel } from '../database/models/point.model';
import { EquipmentModel } from '../database/models/equipment.model';
import { SetpointModel } from '../database/models/setpoint.model';

@Injectable()
export class CommandService {

  constructor(@Inject('CommandModel') private modelClass: ModelClass<CommandModel>,
    @Inject('PointModel') private pointModelClass: ModelClass<PointModel>,
    @Inject('EquipmentModel') private equipmentModelClass: ModelClass<EquipmentModel>,
    @Inject('SetpointModel') private setpointModelClass: ModelClass<SetpointModel>,
    @Inject('LocationModel') private locationModelClass: ModelClass<LocationModel>) { }

  async findAll(filters: Partial<FindDto>): Promise<CommandModel[]> {
    return this.modelClass.query()
      .skipUndefined()
      .joinRelated('point')
      .leftJoinRelated('pointOfLocations')
      .leftJoinRelated('pointOfEquipments')
      .where('point.locationId', filters.locationId)
      .andWhere('point.equipmentId', filters.equipmentId)
      .andWhere('pointOfLocations.id', filters.pointOfLocationId)
      .andWhere('pointOfEquipments.id', filters.pointOfEquipmentId)
      .andWhere('commandTypeId', filters.commandTypeId)
  }

  async findById(id: number): Promise<CommandModel> {
    return this.modelClass.query()
      .findById(id)
      .withGraphFetched('[point.[location, equipment], pointOfLocations, pointOfEquipments]')
  }

  async create(props: Partial<CreateDto>): Promise<CommandModel> {
    return this.modelClass.query()
      .insertGraphAndFetch(props);
  }

  async delete(id: number) {
    return this.pointModelClass
      .query()
      .deleteById(id);
  }

  async update(id: number, props: Partial<UpdateDto>) {
    if (props.point) {
      await this.pointModelClass
        .query()
        .patchAndFetchById(id, props.point)
    }
    return this.modelClass
      .query()
      .patchAndFetchById(id, props)
  }

  async addPointOfLocation(id: number, locationId: number): Promise<number> {
    const command = await this.modelClass.query().findById(id)
    const location = await this.locationModelClass.query().findById(locationId)
    if (!command || !location) {
      return null;
    }
    return this.modelClass.relatedQuery('pointOfLocations')
      .for(id)
      .relate(locationId);
  }

  async removePointOfLocation(id: number, locationId: number): Promise<number> {
    const command = await this.modelClass.query().findById(id)
    const location = await this.locationModelClass.query().findById(locationId)
    if (!command || !location) {
      return null;
    }
    return this.modelClass.relatedQuery('pointOfLocations')
      .for(id)
      .unrelate()
      .where('locationId', locationId);
  }

  async addPointOfEquipment(id: number, equipmentId: number): Promise<number> {
    const command = await this.modelClass.query().findById(id)
    const equipment = await this.equipmentModelClass.query().findById(equipmentId)
    if (!command || !equipment) {
      return null;
    }

    try {
      const returnValue = await this.modelClass.transaction(async trx => {
        const setpoint = await this.setpointModelClass.query(trx)
          .joinRelated('point')
          .findOne({
            commandTypeId: command.commandTypeId,
            'point.equipmentId': equipment.id
          })
        if (!setpoint) {
          await this.setpointModelClass.query(trx)
            .insertGraph({
              commandTypeId: command.commandTypeId,
              point: {
                equipmentId: equipment.id
              }
            });
        }
        return this.modelClass.relatedQuery('pointOfEquipments', trx)
          .for(id)
          .relate(equipmentId);

      });
      return returnValue;
      // Here the transaction has been committed.
    } catch (err) {
      // Here the transaction has been rolled back.
      console.log(err)
      return null;
    }

  }

  async removePointOfEquipment(id: number, equipmentId: number): Promise<number> {
    const command = await this.modelClass.query().findById(id)
    const equipment = await this.equipmentModelClass.query().findById(equipmentId)
    if (!command || !equipment) {
      return null;
    }
    return this.modelClass.relatedQuery('pointOfEquipments')
      .for(id)
      .unrelate()
      .where('equipmentId', equipmentId);
  }

  async trigger(id: number, value: number): Promise<SetpointModel[]> {
    const command = await this.modelClass.query().findById(id);
    if (!command) {
      return null;
    }
    try {
      const returnValue = await this.setpointModelClass.transaction(async trx => {
        await this.setpointModelClass.query()
          .joinRelated('point.equipment.commandsForEquipment')
          .where('point:equipment:commandsForEquipment.id', id)
          .andWhere('setpoints.commandTypeId', command.commandTypeId)
          .patch({ value })
        return this.setpointModelClass.query()
          .joinRelated('point.equipment.commandsForEquipment')
          .where('point:equipment:commandsForEquipment.id', id)
          .andWhere('setpoints.commandTypeId', command.commandTypeId)
          .withGraphFetched('point')
      });
      return returnValue;
      // Here the transaction has been committed.
    } catch (err) {
      console.log(err)
      // Here the transaction has been rolled back.
      return null;
    }
  }
}
