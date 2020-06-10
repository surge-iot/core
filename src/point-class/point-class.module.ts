import { Module } from '@nestjs/common';
import { PointClassService } from './point-class.service';
import { PointClassController } from './point-class.controller';

@Module({
  providers: [PointClassService],
  controllers: [PointClassController],
  exports: [PointClassService],
})
export class PointClassModule {}
