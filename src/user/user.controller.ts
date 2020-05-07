import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards, } from '@nestjs/common';
import { UserService } from './user.service';
import { UserModel } from '../database/models/user.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.userService.findById(id);
  }

  @Post()
  async create(@Body() props: Partial<UserModel>) {
    return this.userService.create(props);
  }

  @Delete(':id')
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    return this.userService.delete(id);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() props: Partial<UserModel>
  ) {
    return this.userService.update(id, props);
  }
}
