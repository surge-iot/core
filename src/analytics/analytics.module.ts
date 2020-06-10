import { Module } from '@nestjs/common';
import { AutoAggregationService } from './auto-aggregation/auto-aggregation.service';
import { LocationModule } from 'src/location/location.module';
import { LocationClassModule } from 'src/location-class/location-class.module';
import { EquipmentModule } from 'src/equipment/equipment.module';
import { EquipmentClassModule } from 'src/equipment-class/equipment-class.module';
import { PointModule } from 'src/point/point.module';
import { PointClassModule } from 'src/point-class/point-class.module';
import { DeviceClassModule } from 'src/device-class/device-class.module';
import { DeviceModule } from 'src/device/device.module';

@Module({
  imports:[
    LocationModule,
    LocationClassModule,
    EquipmentModule,
    EquipmentClassModule,
    PointModule,
    PointClassModule,
    DeviceClassModule,
    DeviceModule,
  ],
  providers: [
    AutoAggregationService,
  ],
  exports:[
    AutoAggregationService
  ]
})
export class AnalyticsModule {}
