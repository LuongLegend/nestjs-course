import {
  ArgumentMetadata,
  HttpStatus,
  Inject,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { ProductService } from '../product.service';
import { Repository } from 'typeorm';
import { Product } from '../../../entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

export class ValidateProductIdPipe implements PipeTransform {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @Inject(REQUEST) private readonly request: Request,
  ) {}
  async transform(value: number, metadata: ArgumentMetadata) {
    const test = this.request.params.id ?? value;
    if (!test) return value;
    const product = await this.productRepository.findOneBy({ id: +test });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return +value;
  }
}
