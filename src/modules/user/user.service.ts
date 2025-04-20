import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  getUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserById(id: number): Promise<User | null> {
    return await this.userRepository.findOneBy({
      id,
    });
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const { email } = user;
    const checkEmail = await this.userRepository.findOneBy({
      email,
    });
    if (checkEmail) {
      throw new HttpException(
        'Email is already register',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const newUser = this.userRepository.create(user);
      const result = await this.userRepository.save(newUser);
      return result;
    } catch (error) {
      this.logger.error(`${error?.message} ${JSON.stringify(user)}`);
      throw new HttpException('Some error', HttpStatus.BAD_REQUEST);
    }
  }

  async updateUser(id: number, user: Partial<User>): Promise<User | null> {
    await this.userRepository.update({ id }, user);
    return this.getUserById(id);
  }

  async deleteUser(id: number): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id });
    await this.userRepository.delete({ id });
    return user;
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async validateUser(email: string, password: string) {
    const user = await this.getUserByEmail(email);
    console.log(user);
    if (!user) return null;
    const status = bcrypt.compareSync(password, user.password);
    console.log(status);
    if (!status) return null;
    return user;
  }
}
