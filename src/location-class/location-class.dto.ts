import { IsNotEmpty, IsOptional, IsPositive } from 'class-validator';

export class CreateDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  parentId: string;
}

export class FindDto {
  @IsOptional()
  parentId: string;
}

