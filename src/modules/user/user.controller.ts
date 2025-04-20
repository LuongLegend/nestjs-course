import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../../entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  findAll(@Query('q') query) {
    //return this.authService.login();
    console.log(query);
    return this.userService.getUser();
  }

  @Get(':id')
  async getOneUser(@Param('id') id: number): Promise<User | null> {
    return await this.userService.getUserById(id);
  }

  @Post()
  async create(@Body(new ValidationPipe()) body: CreateUserDto): Promise<User> {
    const result = await this.userService.createUser(body);
    return result;
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body: any) {
    return this.userService.updateUser(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
