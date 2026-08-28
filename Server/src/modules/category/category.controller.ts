import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CategoriesService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Controller('category')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // POST api/v1/category - Create a new category
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return await this.categoriesService.create(createCategoryDto);
  }

  // GET /api/v1/category - Get all categories
  @Get()
  async getAll(): Promise<Category[]> {
    return await this.categoriesService.getAll();
  }

  // GET /api/v1/category/:id - Get a specific category by ID
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    return await this.categoriesService.getById(id);
  }

  // PATCH /api/v1/category/:id - Update category information by ID
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return await this.categoriesService.update(id, updateCategoryDto);
  }

  // DELETE /api/v1/category/:id - Delete a category by ID
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    return await this.categoriesService.remove(id);
  }
}
