import { IsNotEmpty, IsOptional, IsPositive } from 'class-validator';

export class CreateDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  meta: 'json';

  @IsOptional()
  @IsPositive()
  parentId: number
}

export class UpdateDto {
  @IsOptional()
  name: string;

  @IsOptional()
  meta: 'json';
}
