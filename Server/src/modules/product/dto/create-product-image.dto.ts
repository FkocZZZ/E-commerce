import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class createProductImageDto {
  @IsNumber()
  @IsNotEmpty()
  productId!: number;

  @IsNotEmpty()
  @IsString()
  imageUrl!: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  sortOrder?: number;
}