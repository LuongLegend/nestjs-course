import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from '../../entities/book.entity';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { SearchBookDto } from './dto/search-book.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { plainToInstance } from 'class-transformer';
import { BookDto } from './dto/book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
  ) {}

  async findAll(searchQuery: SearchBookDto) {
    console.log(searchQuery);
    const { search, sort, page, limit } = searchQuery;
    const condition: FindManyOptions<BookEntity> = {
      where: [{ title: Like(`%${search}%`) }, { author: Like(`%${search}%`) }],
      skip: (page - 1) * limit,
      take: limit,
    };

    if (sort)
      condition.order = {
        [sort]: 'ASC',
      };

    const result = await this.bookRepository.find(condition);
    return plainToInstance(BookDto, result);
  }

  async findOne(id: number) {
    const result = await this.bookRepository.findOneBy({ id });
    return plainToInstance(BookDto, result);
  }

  async create(data: CreateBookDto) {
    const newBook = this.bookRepository.create(data);
    return await this.bookRepository.save(newBook);
  }

  async update(id: number, data: UpdateBookDto) {
    const book = await this.bookRepository.findOneBy({ id });
    if (!book) throw new NotFoundException('Book not found');
    Object.assign(book, data);
    const result = await this.bookRepository.save(book);
    return plainToInstance(BookDto, result);
  }

  async delete(id: number) {
    const result = await this.bookRepository.delete({ id });
    return result.affected ? 'OK' : 'Nothing change';
  }
}
