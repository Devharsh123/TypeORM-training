import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import Product from './entities/product.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ProductsService {
constructor(
  @InjectRepository(Product) private productRepository: Repository<Product>,
  private dataSource: DataSource
  ) {}
  
    async create(createProductDto: CreateProductDto, user: any) {
    if(!(user.payload.role==='manufacturer')) {
      throw new HttpException(`${user.payload.role} cannot create product`,HttpStatus.BAD_REQUEST);
    }
    const product = new Product();

      product.u_id = user.payload.id;
      product.p_name = createProductDto.p_name;
      product.price = createProductDto.price;
    const response = await this.productRepository.create(product)
    await this.productRepository.save(response);
    return { response };
  }

  async createProducts(createProductDto: CreateProductDto[], user: any) {
    console.log(createProductDto)
    const product = new Product();
    const queryRunner = await this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try{
      product.u_id = user.payload.id;
      product.p_name = createProductDto[0].p_name;
      product.price = createProductDto[0].price;
      await queryRunner.manager.save(product)

      product.u_id = user.payload.id;
      product.p_name = createProductDto[1].p_name;
      product.price = createProductDto[1].price;
      await queryRunner.manager.save(product)

      await queryRunner.commitTransaction();
    }catch(err){
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

  }

  findAll(prodId?: number) {
    return this.productRepository.find();
  }

  findById(prodId:number){
    if(prodId){
      return this.productRepository.findBy({id: prodId});
    }
  }

  findOne(id: number) {
    return this.productRepository.findBy({id});
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: number) {
    return await this.productRepository.delete({id});
  }
}
