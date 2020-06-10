import { Injectable } from '@nestjs/common';
import { LocationService } from 'src/location/location.service';
import { LocationClassService } from 'src/location-class/location-class.service';
import { EquipmentService } from 'src/equipment/equipment.service';
import { EquipmentClassService } from 'src/equipment-class/equipment-class.service';
import { PointService } from 'src/point/point.service';
import { PointClassService } from 'src/point-class/point-class.service';
import { DeviceService } from 'src/device/device.service';
import { BrickGraph } from '../brick-graph';

@Injectable()
export class AutoAggregationService {
  constructor(
    private locationService: LocationService,
    private equipmentService: EquipmentService,
    private pointService: PointService,
    private deviceService: DeviceService
    ){}

    async init(){
      const locations = await this.locationService.findAll({});
      const equipments = await this.equipmentService.findAll({});
      const points = await this.pointService.findAll({});
      let G = new BrickGraph(locations, equipments, points);
    }
}
