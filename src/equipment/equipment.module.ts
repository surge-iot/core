import { Module } from '@nestjs/common';
import { EquipmentService } from './equipment.service';

@Module({
  providers: [EquipmentService]
})
export class EquipmentModule {}
