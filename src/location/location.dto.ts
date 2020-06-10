import { IsNotEmpty, IsOptional, IsPositive } from 'class-validator';

export class CreateDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  classId: string;

  @IsOptional()
  meta: object;
}

export class UpdateDto {
  @IsOptional()
  name: string;

  @IsOptional()
  classId: string;

  @IsOptional()
  meta: object;
}


export class FindDto {
  @IsOptional()
  classId: string;
}
