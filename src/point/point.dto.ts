import { IsNotEmpty, IsOptional, IsPositive, ValidateNested } from 'class-validator';
import { PointModel } from '../database/models/point.model';
import { Type } from 'class-transformer';

export class CreateDto {

  @IsNotEmpty()
  classId: string;

  @IsOptional()
  locationId: number;

  @IsOptional()
  equipmentId: number;

  @IsOptional()
  meta: 'json';
}

export class FindDto {

  @IsOptional()
  classId: string;

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
  classId: string;

  @IsOptional()
  locationId: number;

  @IsOptional()
  equipmentId: number;

  @IsOptional()
  meta: 'json';
}
