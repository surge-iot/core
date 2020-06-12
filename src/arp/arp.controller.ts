import { Controller, Post, Req, Param, Get } from '@nestjs/common';
import { ArpService } from './arp.service';
import { Request } from 'express';

@Controller('arp')
export class ArpController {
  constructor(
    private arpService: ArpService
  ) { }

  @Post('gateway/:serial/update-ip')
  async updateGatewayIp(@Param('serial') serial: string, @Req() request: Request) {
    // console.log(request);
    return this.arpService.updateGatewayIp(serial, request.connection.remoteAddress)
  }

  @Post('device/:deviceSerial/update-gateway/:gatewaySerial')
  async updateDeviceGateway(@Param('deviceSerial') deviceSerial: string, @Param('gatewaySerial') gatewaySerial: string) {
    // console.log(request);
    return this.arpService.updateDeviceGateway(deviceSerial, gatewaySerial);
  }
}
