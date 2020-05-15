import { IsNotEmpty, IsOptional, IsPositive } from 'class-validator';

export class CreateDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  classId: string

  @IsNotEmpty()
  locationId: number

  @IsOptional()
  parentId: number
  
  @IsOptional()
  meta: 'json';
}

export class UpdateDto {
  @IsOptional()
  name: string;

  @IsOptional()
  classId: string

  @IsOptional()
  locationId: number

  @IsOptional()
  parentId: number

  @IsOptional()
  meta: 'json';
}

export class FindDto {
  @IsOptional()
  classId: string

  @IsOptional()
  locationId: number | 'null'

  @IsOptional()
  parentId: number | 'null'
}

