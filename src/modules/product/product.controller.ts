import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '../../entities/product.entity';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Post()
  createProduct(@Body() body: Product) {
    return this.productService.createProduct(body);
  }

  @Patch(':id')
  updateProduct(@Param('id') productId: number, @Body() body: Product) {
    return this.productService.updateProduct(productId, body);
  }

  @Delete(':id')
  removeProduct(@Param('id') productId: number) {
    return this.productService.deleteProduct(productId);
  }
}
