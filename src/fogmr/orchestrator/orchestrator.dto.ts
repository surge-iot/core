import { IsNotEmpty, IsArray } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsArray()
  inputDeviceSerials: string[];

  @IsNotEmpty()
  outputDeviceSerial: string

  @IsNotEmpty()
  fogmrFunctionName: string;
  
}
