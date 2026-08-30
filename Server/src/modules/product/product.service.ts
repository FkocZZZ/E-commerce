import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import Helper from 'src/ultils/helpers';
import { createProductImageDto } from './dto/create-product-image.dto';
import { ProductImage } from './entities/product-image.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>
  ) {}

  // Create a new product with an automatically generated slug
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { name } = createProductDto;

    const slug = Helper.makeSlugFromString(name);

    const isExist = await this.productRepository.findOneBy({ slug });

    if (isExist) {
      throw new ConflictException(`Product with name "${name}" already exists`);
    }

    const newProduct = this.productRepository.create({ ...createProductDto, slug });

    return await this.productRepository.save(newProduct);
  }

  // Retrieve all products from the database
  async getAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  // Get a specific product detail by ID
  async getById(id: number): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id })

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found!`)
    }

    return product;
  }

  // Update an existing product and recalculate slug if the name changes
  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const { name } = updateProductDto;
    const product = await this.getById(id);

    if (name) {
      const newSlug = Helper.makeSlugFromString( name );

      const isDuplicate = await this.productRepository.findOneBy({ slug: newSlug })

      if (isDuplicate && isDuplicate.id != id) {
        throw new ConflictException(`Product name "${name}" already exsit`)
      }
      product.slug = newSlug;
    }
    const updateProduct = this.productRepository.merge(product, updateProductDto);
    return await this.productRepository.save(updateProduct);
  }

  // Delete a product by ID
  async remove(id: number): Promise<{ message: string }> {
    const product = await this.getById(id)
    await this.productRepository.remove(product);
    return { message: `Product with ID ${id} has been deleted successfully.`};
  }
}
