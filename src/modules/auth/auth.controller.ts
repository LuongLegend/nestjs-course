import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @UsePipes(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }))
  async loginUser(@Body() loginData: LoginUserDto) {
    return await this.authService.handleLogin(loginData);
  }
}
