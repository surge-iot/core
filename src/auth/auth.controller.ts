import { Body, Controller, Request, Get, Param, ParseIntPipe, Post, Put, UseGuards, } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto, LoginDto } from './auth.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private usersService: UsersService, private authService: AuthService) {
  }

  @Post('register')
  async register(@Body() props: RegisterDto) {
    return this.usersService.create(props);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
