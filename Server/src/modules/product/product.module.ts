import { Module } from '@nestjs/common';
import { ProductsService } from './product.service';
import { ProductsController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductImage } from './entities/product-image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductImage])
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
