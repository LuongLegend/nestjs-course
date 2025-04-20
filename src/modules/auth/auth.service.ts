import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../../entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async handleLogin({ email, password }: LoginUserDto) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) throw new UnauthorizedException('User is not exist');

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword)
      throw new UnauthorizedException('Password is not correct');
    //ok
    const payload = {
      email,
      userId: user.id,
    };
    const jwtToken = this.jwtService.sign(payload);
    return jwtToken;
  }
}
