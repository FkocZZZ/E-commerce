import { PartialType } from "@nestjs/mapped-types";
import { createProductImageDto } from "./create-product-image.dto";

export class UpdateProductImage extends PartialType(createProductImageDto) {}