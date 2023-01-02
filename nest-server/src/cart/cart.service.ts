import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import Product from 'src/products/entities/product.entity';
import { ProductsService } from 'src/products/products.service';
import User from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { DataSource, Repository } from 'typeorm';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import Cart from './entities/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private cartRepository: Repository<Cart>,
    private dataSource: DataSource,
    private productService: ProductsService
  ) { }

  async create(createCartDto: CreateCartDto, user: any) {
    const cart = new Cart();

    cart.p_id = createCartDto.p_id,
      cart.consumer_id = user.payload.id

    const response = await this.cartRepository.create(cart);
    await this.cartRepository.save(response);
    return { response };
  }

  async toggle(p_id: number, user: any) {
    const cart = await this.cartRepository.findBy({p_id : p_id, consumer_id: user.payload.id});
    if(!cart){
      throw new HttpException('cart not found',HttpStatus.NOT_FOUND);
    }
    const toggleResponse = await this.cartRepository.update({id: cart[0].id},{isPurchased: !cart[0].isPurchased})
    if(!toggleResponse.affected){
      throw new HttpException('updation error',HttpStatus.BAD_REQUEST);
    }
    return !cart[0].isPurchased;
  }

  async findAll(user: any) {
    const id = user.payload.id;

    const cart = await this.cartRepository.findBy({ consumer_id: id });
    if(cart.length===0) {
      throw new HttpException('No product in cart for this user',HttpStatus.BAD_REQUEST)
    }
    const userId = cart[0].consumer_id
    const userWithProduct = await this.dataSource.getRepository(Cart)
      .createQueryBuilder('cart')
      .innerJoinAndSelect(User, 'user', `cart.consumer_id=user.id`)
      .innerJoinAndSelect(Product, 'product', 'cart.p_id=product.id')
      .select(['cart.id', 'cart.isPurchased'])
      .addSelect(['user.id', 'user.name', 'user.email'])
      .addSelect(['product.id', 'product.p_name', 'product.price', 'product.createdAt', 'product.updatedAt'])
      .where("cart.consumer_id=:id", { id: userId })
      .getRawMany();

    return { userWithProduct };
  }

  async transaction(pid: number, user: any) {
   this.toggle(pid, user);
   this.productService.remove(pid);
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
