import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  registerUser(@Body(new ValidationPipe()) body: CreateUserDto) {
    return this.authService.register(body);
  }

  @Post('/login')
  @UsePipes(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }))
  async loginUser(@Body() body: LoginUserDto) {
    const { email, password } = body;
    const result = await this.authService.login(email, password);
    if (!result) throw new UnauthorizedException();
    return result;
  }
}
