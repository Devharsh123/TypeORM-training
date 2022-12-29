import { PartialType } from '@nestjs/mapped-types';
import { CreateProductBuyDto } from './create-product_buy.dto';

export class UpdateProductBuyDto extends PartialType(CreateProductBuyDto) {}
