import { Module } from '@nestjs/common';
import { PointClassService } from './point-class.service';
import { PointClassController } from './point-class.controller';

@Module({
  providers: [PointClassService],
  controllers: [PointClassController]
})
export class PointClassModule {}
