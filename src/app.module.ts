import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { LocationModule } from './location/location.module';
import { EquipmentModule } from './equipment/equipment.module';
import { SensorModule } from './sensor/sensor.module';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule, LocationModule, EquipmentModule, SensorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
