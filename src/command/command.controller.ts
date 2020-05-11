import { Controller, Get, Query, Body, Post, Param, ParseIntPipe, Delete, HttpException, HttpStatus, Put } from '@nestjs/common';
import { CommandService } from './command.service';
import { CreateDto, FindDto, UpdateDto } from './command.dto';

@Controller('command')
export class CommandController {
  constructor(private commandService: CommandService) { }

  @Get()
  async findAll(@Query() filters: FindDto) {
    return this.commandService.findAll(filters);
  }

  @Post()
  async create(@Body() props: CreateDto) {
    return this.commandService.create(props);
  }

  @Get(':id')
  async findById(@Param('id', new ParseIntPipe()) id: number) {
    const command = await this.commandService.findById(id);
    if (!command) {
      throw new HttpException('Resource not found', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return command;
  }

  @Delete(':id')
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    const command = await this.commandService.delete(id);
    if (!command) {
      throw new HttpException('Resource not found', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return command;
  }

  @Put(':id')
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() props: UpdateDto
  ) {
    const command = this.commandService.update(id, props);
    if (!command) {
      throw new HttpException('Resource not found', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return command;
  }


  @Put(':id/add-point-of-location/:locationId')
  async addPointOfLocation(@Param('id', new ParseIntPipe()) id: number,
    @Param('locationId', new ParseIntPipe()) locationId: number) {
    const affected = await this.commandService.addPointOfLocation(id, locationId);
    if (!affected) {
      throw new HttpException('Resource not found', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return affected;
  }

  @Delete(':id/remove-point-of-location/:locationId')
  async removePointOfLocation(@Param('id', new ParseIntPipe()) id: number,
    @Param('locationId', new ParseIntPipe()) locationId: number) {
    const affected = await this.commandService.removePointOfLocation(id, locationId);
    if (!affected) {
      throw new HttpException('Resource not found', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return affected;
  }


  @Put(':id/add-point-of-equipment/:equipmentId')
  async addPointOfEquipment(@Param('id', new ParseIntPipe()) id: number,
    @Param('equipmentId', new ParseIntPipe()) equipmentId: number) {
    const affected = await this.commandService.addPointOfEquipment(id, equipmentId);
    if (!affected) {
      throw new HttpException('Resource not found', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return affected;
  }

  @Delete(':id/remove-point-of-equipment/:equipmentId')
  async removePointOfEquipment(@Param('id', new ParseIntPipe()) id: number,
    @Param('equipmentId', new ParseIntPipe()) equipmentId: number) {
    const affected = await this.commandService.removePointOfEquipment(id, equipmentId);
    if (!affected) {
      throw new HttpException('Resource not found', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return affected;
  }

  @Put(':id/trigger/:value')
  async trigger(@Param('id', new ParseIntPipe()) id: number,
    @Param('value', new ParseIntPipe()) value: number) {
    const affected = await this.commandService.trigger(id, value);
    if (!affected) {
      throw new HttpException('Resource not found', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return affected;
  }
}
