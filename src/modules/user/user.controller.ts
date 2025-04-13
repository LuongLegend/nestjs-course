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
  getOneUser(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

  @Post()
  create(@Body(new ValidationPipe()) body: CreateUserDto) {
    return this.userService.createUser(body);
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
