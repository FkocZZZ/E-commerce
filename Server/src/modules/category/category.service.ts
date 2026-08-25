import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import Helper from 'src/ultils/helpers';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ){}

  //POST Category
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const { name } = createCategoryDto;

    const slug = Helper.makeSlugFromString(name!);

    const isExist =  await this.categoryRepository.findOneBy({ slug });
    if (isExist) throw new ConflictException(`Category with name "${name}" already exists`);
    
    const newCategory = this.categoryRepository.create({
      ...createCategoryDto,
      slug,
    });

    return await this.categoryRepository.save(newCategory);
  }

  //GET Category
  async getAll() {
    return await this.categoryRepository.find();
  }

  //GET Category By Id
  async getById(id: number) {
    const category = await this.categoryRepository.findOneBy({ id })

    if(!category)
      throw new NotFoundException(`Category with ID ${id} not found!`);

    return category;
  }

  //PATCH Category
  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.getById(id);
    const { name } = updateCategoryDto;

    if (updateCategoryDto.name) {
      const newSlug = Helper.makeSlugFromString(name!);

      const isDuplicate = await this.categoryRepository.findOneBy({slug: newSlug})

      if(isDuplicate && isDuplicate.id !== id) {
        throw new ConflictException(`Category name "${name}" already exsit`)
      }

      (updateCategoryDto as any).slug = newSlug;
    }

    const updatedCategory = Object.assign(category, updateCategoryDto);

    return await this.categoryRepository.save(updatedCategory);
  }

  //DELETE Category
  async remove(id: number): Promise<{ message: string }> {
    const category = await this.getById(id);
    
    await this.categoryRepository.remove(category);

    return { message: `Category with ID ${id} has been deleted successfully.`};
  }
}
