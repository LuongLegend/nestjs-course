import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}
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
  create(@Body() body: any) {
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
