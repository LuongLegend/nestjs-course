import {
  ArgumentMetadata,
  HttpStatus,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { ProductService } from '../product.service';
import { Repository } from 'typeorm';
import { Product } from '../../../entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class ValidateProductIdPipe implements PipeTransform {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async transform(value: number, metadata: ArgumentMetadata) {
    const product = await this.productRepository.findOneBy({ id: value });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return +value;
  }
}
