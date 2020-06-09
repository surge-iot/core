import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { LocationModule } from './location/location.module';
import { EquipmentModule } from './equipment/equipment.module';
import { PointModule } from './point/point.module';
import { LocationClassModule } from './location-class/location-class.module';
import { EquipmentClassModule } from './equipment-class/equipment-class.module';
import { PointClassModule } from './point-class/point-class.module';
import { DeviceClassModule } from './device-class/device-class.module';
import { DeviceModule } from './device/device.module';

@Module({
  imports: [
    DatabaseModule, 
    UserModule, 
    AuthModule, 
    LocationModule, 
    EquipmentModule, 
    PointModule, 
    LocationClassModule, 
    EquipmentClassModule, 
    PointClassModule,
    DeviceClassModule,
    DeviceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
