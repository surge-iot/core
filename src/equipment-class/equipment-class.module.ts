import { Module } from '@nestjs/common';
import { EquipmentClassService } from './equipment-class.service';
import { EquipmentClassController } from './equipment-class.controller';

@Module({
  providers: [EquipmentClassService],
  controllers: [EquipmentClassController]
})
export class EquipmentClassModule {}
