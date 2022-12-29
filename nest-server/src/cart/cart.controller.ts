import { Controller, Get, Request, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { AuthGuard} from '@nestjs/passport';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(@Body() createCartDto: CreateCartDto, @Request() req) {
    return this.cartService.create(createCartDto, req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('toggle/:pid')
  togglePurchase(@Param('pid') pid: number, @Request() req) {
    return this.cartService.toggle(pid, req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('product')
  findAll(@Request() req) {
    return this.cartService.findAll(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('transaction/:pid')
  performTansaction(@Param('pid') pid: number, @Request() req) {
    return this.cartService.transaction(pid, req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
