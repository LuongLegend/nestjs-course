import {
  Controller,
  Get,
  HttpCode,
  Res,
  HttpStatus,
  Param,
  Query,
  Body,
  Header,
  Redirect,
  Post,
  HttpException,
  BadRequestException,
  ParseIntPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { CreateStudentDto } from 'src/student/dto/create-student.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('student')
  @HttpCode(401)
  @Header('Cache-Control', 'no-store')
  //@Redirect('/')
  getStudent(
    @Query('q') q: string,
    @Query('age') age: number,
    @Body() body,
    @Res({ passthrough: true }) res: Response,
  ) {
    throw new BadRequestException('This is bad request', {
      description: 'you are wrong',
      cause: new Error(),
    });
    //throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    //throw new HttpException(
    //  { status: HttpStatus.FORBIDDEN, message: 'Forbidden hihi!' },
    //  HttpStatus.FORBIDDEN,
    //  {
    //    cause: new Error('hihi'),
    //  },
    //);
    //res.setHeader('Cache-Control', 'no-store');
    return {
      data: this.appService.getStudent(),
    };
  }

  @Get('student/:id')
  getStudentById(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    studentId: number,
  ) {
    console.log(typeof studentId);
    return `studentId is ${studentId}`;
  }

  @Post('student')
  createStudent(@Body() body: CreateStudentDto) {
    console.log(body);
    return `studentId is`;
  }
}
