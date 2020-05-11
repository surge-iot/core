import { IsNotEmpty, IsOptional, IsPositive, ValidateNested } from 'class-validator';
import { PointModel } from '../database/models/point.model';
import { Type } from 'class-transformer';

export class CreateDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  deviceId: string;

  @IsNotEmpty()
  sensorTypeId: string;

  @IsOptional()
  meta: 'json';

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PointModel)
  point: PointModel;
}

export class FindDto{
  @IsOptional()
  name: string;

  @IsOptional()
  sensorTypeId: string;

  @IsOptional()
  deviceId: string;

  @IsOptional()
  locationId: number;

  @IsOptional()
  equipmentId: number;

  @IsOptional()
  pointOfLocationId: number;

  @IsOptional()
  pointOfEquipmentId: number;
}


export class UpdateDto {
  @IsOptional()
  name: string;

  @IsOptional()
  sensorTypeId: string;

  @IsOptional()
  deviceId: string;

  @IsOptional()
  meta: 'json';

  @IsOptional()
  @ValidateNested()
  @Type(() => PointModel)
  point: PointModel;
}
