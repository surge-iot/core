import { IsNotEmpty, IsOptional, IsPositive } from 'class-validator';

export class CreateDto {
  @IsNotEmpty()
  serial: string;

  @IsNotEmpty()
  classId: string

  @IsNotEmpty()
  locationId: number

  @IsOptional()
  meta: object;
}

export class UpdateDto {
  @IsOptional()
  serial: string;

  @IsOptional()
  classId: string

  @IsOptional()
  locationId: number

  @IsOptional()
  meta: object;
}

export class FindDto {
  @IsOptional()
  classId: string

  @IsOptional()
  locationId: number | 'null'

}

