import { Module } from '@nestjs/common';
import { ProductBuyService } from './product_buy.service';
import { ProductBuyController } from './product_buy.controller';

@Module({
  controllers: [ProductBuyController],
  providers: [ProductBuyService]
})
export class ProductBuyModule {}
