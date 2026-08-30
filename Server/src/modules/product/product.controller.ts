import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Controller('product')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // POST api/v1/product - Create a new product with optional image album
  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return await this.productsService.create(createProductDto);
  }

  // GET api/v1/product - Get a list of all products
  @Get()
  async getAll(): Promise<Product[]> {
    return await this.productsService.getAll();
  }

  // GET api/v1/product/:id - Get a specific product detail by ID
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return await this.productsService.getById(id);
  }

  // PATCH api/v1/product/:id - Update product properties by ID
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto
  ): Promise<Product> {
    return await this.productsService.update(id, updateProductDto);
  }

  // DELETE api/v1/product/:id - Delete a product by ID
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string}> {
    return await this.productsService.remove(id);
  }
}
