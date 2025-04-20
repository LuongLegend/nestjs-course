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
  ParseIntPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '../../entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { ValidateProductIdPipe } from './pipes/ValidateProductIdPipe.pipe';
import { classToPlain, instanceToInstance, instanceToPlain, plainToInstance } from 'class-transformer';

@Controller('product')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
//@UsePipes(ValidateProductIdPipe)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  @Post()
  async createProduct(@Body() body: CreateProductDto) {
    console.log(body);
    const result = await this.productService.createProduct(body);
    const dto = plainToInstance(CreateProductDto, result);

    return instanceToPlain(dto);
    //return instanceToPlain(result);
    //const transformResult = instanceToInstance(CreateProductDto);
    //return transformResult;
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
