import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Global()
@Module({
  controllers: [AuthController, UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {
}