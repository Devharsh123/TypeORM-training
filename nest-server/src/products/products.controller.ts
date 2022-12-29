import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {AuthGuard} from '@nestjs/passport';
import { HasRoles } from 'src/auth/has-roles.decorator';
import { userRole } from 'src/users/entities/user.entity';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @HasRoles(userRole.MANUFACTURER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('create')
  create(@Body() createProductDto: CreateProductDto, @Request() req) {
    return this.productsService.create(createProductDto, req.user);
  }

  @HasRoles(userRole.MANUFACTURER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('createmultiple')
  createMultipleProducts(@Body() createProductDto: CreateProductDto[], @Request() req) {
    return this.productsService.createProducts(createProductDto, req.user);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
