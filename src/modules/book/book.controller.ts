import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { BookService } from './book.service';
import { SearchBookDto } from './dto/search-book.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async findAll(@Query() query: SearchBookDto) {
    return await this.bookService.findAll(query);
  }

  @Get(':id')
  async getABook(@Param('id', new ParseIntPipe()) id: number) {
    return await this.bookService.findOne(id);
  }

  @Post()
  async createBook(@Body() body: CreateBookDto) {
    return await this.bookService.create(body);
  }

  @Put(':id')
  async updateBook(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: UpdateBookDto,
  ) {
    return await this.bookService.update(id, body);
  }

  @Delete(':id')
  async deleteBook(@Param('id', new ParseIntPipe()) id: number) {
    return await this.bookService.delete(id);
  }
}
