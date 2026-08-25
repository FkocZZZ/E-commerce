import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CategoriesService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  //api/v1/categories
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return await this.categoriesService.create(createCategoryDto);
  }

  //api/v1/categories
  @Get()
  async getAll(): Promise<Category[]> {
    return await this.categoriesService.getAll();
  }

  //api/v1/categories/:id
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    return await this.categoriesService.getById(id);
  }

  //api/v1/categories/:id
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return await this.categoriesService.update(id, updateCategoryDto);
  }

  //api/v1/categories/:id
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    return await this.categoriesService.remove(id);
  }
}
