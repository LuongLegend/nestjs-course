import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '../../entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { ValidateProductIdPipe } from './pipes/ValidateProductIdPipe.pipe';

@Controller('product')
@UsePipes(new ValidationPipe())
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ValidateProductIdPipe) id: number) {
    return this.productService.findOne(id);
  }

  @Post()
  createProduct(@Body() body: CreateProductDto) {
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
