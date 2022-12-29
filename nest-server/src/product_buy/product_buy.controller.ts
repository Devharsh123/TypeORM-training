import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductBuyService } from './product_buy.service';
import { CreateProductBuyDto } from './dto/create-product_buy.dto';
import { UpdateProductBuyDto } from './dto/update-product_buy.dto';

@Controller('product-buy')
export class ProductBuyController {
  constructor(private readonly productBuyService: ProductBuyService) {}

  @Post()
  create(@Body() createProductBuyDto: CreateProductBuyDto) {
    return this.productBuyService.create(createProductBuyDto);
  }

  @Get()
  findAll() {
    return this.productBuyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productBuyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductBuyDto: UpdateProductBuyDto) {
    return this.productBuyService.update(+id, updateProductBuyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productBuyService.remove(+id);
  }
}
