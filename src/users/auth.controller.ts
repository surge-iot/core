import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserModel } from '../database/models/user.model';
import { RegisterDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private usersService: UsersService) {
  }

  @Post('register')
  async register(@Body() props: RegisterDto) {
    return this.usersService.create(props);
  }
}