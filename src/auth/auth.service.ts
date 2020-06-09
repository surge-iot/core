import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from '../database/models/user.model';
import * as argon2 from "argon2";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<Partial<UserModel> | null> {
    const user = await this.userService.findOne({ email: email });
    if (user && await argon2.verify(user.password, password)) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { id: user.id, name:user.name, email: user.email, isAdmin:user.isAdmin };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
