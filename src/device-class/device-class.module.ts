import { Module } from '@nestjs/common';
import { DeviceClassService } from './device-class.service';
import { DeviceClassController } from './device-class.controller';

@Module({
  providers: [DeviceClassService],
  controllers: [DeviceClassController]
})
export class DeviceClassModule {}
