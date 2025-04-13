import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async register(user: CreateUserDto) {
    const { password } = user;
    const hashPassword = await bcrypt.hash(password, 10);
    user.password = hashPassword;
    return await this.userService.createUser(user);
  }

  async login(email: string, password: string) {
    //handle
    const user = await this.userService.validateUser(email, password);
    return user;
  }
}
