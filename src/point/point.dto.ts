import { IsNotEmpty, IsOptional, IsPositive, ValidateNested } from 'class-validator';
import { PointModel } from '../database/models/point.model';
import { Type } from 'class-transformer';

export class CreateDto {

  @IsNotEmpty()
  classId: string;

  @IsOptional()
  name: string;

  @IsOptional()
  locationId: number;

  @IsOptional()
  equipmentId: number;

  @IsOptional()
  meta: object;
}

export class FindDto {

  @IsOptional()
  classId: string;

  @IsOptional()
  name: string;
  
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
  name: string;

  @IsOptional()
  locationId: number;

  @IsOptional()
  equipmentId: number;

  @IsOptional()
  meta: object;
}
