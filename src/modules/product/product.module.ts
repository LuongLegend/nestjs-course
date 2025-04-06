import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../../entities/product.entity';
import { ValidateProductIdPipe } from './pipes/ValidateProductIdPipe.pipe';

@Module({
  controllers: [ProductController],
  providers: [ProductService, ValidateProductIdPipe],
  imports: [TypeOrmModule.forFeature([Product])],
})
export class ProductModule {}
