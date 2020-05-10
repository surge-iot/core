import { IsNotEmpty, IsOptional, IsPositive, ValidateNested } from 'class-validator';
import { PointModel } from '../database/models/point.model';
import { Type } from 'class-transformer';

export class CreateDto {
  @IsNotEmpty()
  commandTypeId: string;

  @IsOptional()
  meta: 'json';

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PointModel)
  point: PointModel;
}

export class FindDto{
  @IsOptional()
  commandTypeId: string;

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
  commandTypeId: string;

  @IsOptional()
  meta: 'json';

  @IsOptional()
  @ValidateNested()
  @Type(() => PointModel)
  point: PointModel;
}
