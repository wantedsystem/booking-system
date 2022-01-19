import { Controller, Post, UseGuards, Body, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { AuthUser } from './auth/user.decorator';
import { User } from './entities/user.entity';
import { LoginDto, RegisterDto } from './models/auth.model';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Get('profile')
  @UseGuards(AuthGuard())
  getProfile(@AuthUser() user: User) {
    return user;
  }

  @Post('register')
  async register(@Body() creds: RegisterDto) {
    return this.authService.register(creds);
  }

  @Post('login')
  async login(@Body() user: LoginDto) {
    return this.authService.login(user);
  }
}
