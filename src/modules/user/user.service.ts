import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  getUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  getUserById(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({
      id,
    });
  }

  async createUser(user: Partial<User>): Promise<User> {
    const result = this.userRepository.create(user);
    return await this.userRepository.save(result);
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
