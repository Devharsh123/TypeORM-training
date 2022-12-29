import { Injectable } from '@nestjs/common';
import { CreateProductBuyDto } from './dto/create-product_buy.dto';
import { UpdateProductBuyDto } from './dto/update-product_buy.dto';

@Injectable()
export class ProductBuyService {
  create(createProductBuyDto: CreateProductBuyDto) {
    return 'This action adds a new productBuy';
  }

  findAll() {
    return `This action returns all productBuy`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productBuy`;
  }

  update(id: number, updateProductBuyDto: UpdateProductBuyDto) {
    return `This action updates a #${id} productBuy`;
  }

  remove(id: number) {
    return `This action removes a #${id} productBuy`;
  }
}
