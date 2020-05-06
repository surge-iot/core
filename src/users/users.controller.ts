import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards, } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserModel } from '../database/models/user.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.usersService.findById(id);
  }

  @Post()
  async create(@Body() props: Partial<UserModel>) {
    return this.usersService.create(props);
  }

  @Delete(':id')
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    return this.usersService.delete(id);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() props: Partial<UserModel>
  ) {
    return this.usersService.update(id, props);
  }
}
