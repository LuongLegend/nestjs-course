import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
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
  getOneUser(@Param('id') id: string) {
    return `user Id: ${id}`;
  }

  @Post()
  create(@Body() body: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return body;
  }
}
