import { Module } from '@nestjs/common';
import { ArpService } from './arp.service';
import { ArpController } from './arp.controller';
import { DeviceModule } from 'src/device/device.module';

@Module({
  imports:[DeviceModule],
  providers: [ArpService],
  controllers: [ArpController]
})
export class ArpModule {}
