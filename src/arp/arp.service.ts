import { Injectable } from '@nestjs/common';
import { DeviceService } from 'src/device/device.service';

@Injectable()
export class ArpService {
  constructor(
    private deviceService: DeviceService,
  ) { }

  async updateGatewayIp(serial: string, ip: string) {
    let device = await this.deviceService.findBySerial(serial);
    let meta = device.meta || {};
    meta["ip"] = ip;
    return this.deviceService.update(device.id, {meta});
  }

  async updateDeviceGateway(deviceSerial: string, gatewaySerial: string) {
    let device = await this.deviceService.findBySerial(deviceSerial);
    let meta = device.meta || {};
    meta["gateway"] = gatewaySerial;
    return this.deviceService.update(device.id, {meta});
  }

  async findDeviceGateway(serial:string){
    return (await this.deviceService.findBySerial(serial)).meta['gateway'];
  }

  async findGatewayIp(serial:string){
    return (await this.deviceService.findBySerial(serial)).meta['ip'];
  }
}
