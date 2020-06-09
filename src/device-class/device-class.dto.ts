import { IsNotEmpty, IsOptional, IsPositive } from 'class-validator';

export class CreateDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  parentId: string;

  @IsOptional()
  meta: object;
  
}

export class FindDto {
  @IsOptional()
  parentId: string;
}

