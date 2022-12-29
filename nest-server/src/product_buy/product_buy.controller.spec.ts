import { Test, TestingModule } from '@nestjs/testing';
import { ProductBuyController } from './product_buy.controller';
import { ProductBuyService } from './product_buy.service';

describe('ProductBuyController', () => {
  let controller: ProductBuyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductBuyController],
      providers: [ProductBuyService],
    }).compile();

    controller = module.get<ProductBuyController>(ProductBuyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
