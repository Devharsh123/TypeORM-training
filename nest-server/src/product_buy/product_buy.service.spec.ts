import { Test, TestingModule } from '@nestjs/testing';
import { ProductBuyService } from './product_buy.service';

describe('ProductBuyService', () => {
  let service: ProductBuyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductBuyService],
    }).compile();

    service = module.get<ProductBuyService>(ProductBuyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
