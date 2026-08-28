import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/modules/user/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //POST api/v1/auth/registerr - Register a new user account
  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<User> {
    return await this.authService.register(registerDto);
  }

  //POST api/v1/auth/login - Authenticate user credentials and log in
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ message: string }> {
    return await this.authService.login(loginDto);
  }
}
