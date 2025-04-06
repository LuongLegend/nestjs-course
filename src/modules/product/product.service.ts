import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  findAll() {
    return this.productRepository.find();
  }

  async createProduct(data: Partial<Product>) {
    const newProduct = this.productRepository.create(data);
    return this.productRepository.save(newProduct);
  }

  async updateProduct(id: number, data: Partial<Product>) {
    await this.productRepository.update({ id }, data);
    return this.productRepository.findOneBy({ id });
  }

  async deleteProduct(id: number) {
    const product = await this.productRepository.delete({ id });
    return product;
  }
}
