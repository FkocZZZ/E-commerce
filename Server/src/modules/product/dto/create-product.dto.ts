import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Min, ValidateNested } from "class-validator";

class NestedProductImageDto {
  @IsNotEmpty()
  @IsString()
  imageUrl!: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  sortOrder?: number;
}

export class CreateProductDto {
  @IsNotEmpty()
  @IsNumber()
  categoryId!: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true})
  @Type(() => NestedProductImageDto)
  images?: NestedProductImageDto[];

  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  brand?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price!: number;

  @IsNumber()
  @Min(0)
  quantity: number = 0;

  @IsOptional()
  @IsString()
  sku?: string;

  @IsOptional()
  @IsString()
  thumbnailUrl?: string;
}
