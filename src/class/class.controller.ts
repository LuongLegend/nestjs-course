import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Post,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ClassService } from './class.service';
import { HttpExceptionFilter } from '../http-exception.filter';
@Controller('class')
export class ClassController {
  //constructor-based injection
  //constructor(private classService: ClassService) {}
  @Inject(ClassService) //property-based injection
  private readonly classService: ClassService;
  @Get()
  @UseFilters(HttpExceptionFilter)
  findAll() {
    throw new BadRequestException();
    //return this.classService.findAll();
  }

  @Post()
  //@UsePipes(new ValidationPipe())
  createClass(@Body() body) {
    return {};
  }
}
