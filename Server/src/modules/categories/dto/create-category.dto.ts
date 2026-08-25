import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreateCategoryDto {
  @IsString({ message: 'Category name must be string!' })
  @IsNotEmpty({ message: 'Category name must not be empty!' })
  @Length(2, 100, { message: 'Category name must contain between 2 to 100 characters!' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string!' })
  description?: string;

  @IsOptional()
  @IsString({ message: 'Image URL must be a valid text path!' })
  imageUrl?: string
}
