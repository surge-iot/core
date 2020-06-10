import { Module } from '@nestjs/common';
import { LocationClassService } from './location-class.service';
import { LocationClassController } from './location-class.controller';

@Module({
  providers: [LocationClassService],
  controllers: [LocationClassController],
  exports: [LocationClassService],
})
export class LocationClassModule {}
