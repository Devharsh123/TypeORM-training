import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { TodoModule } from './todo/todo.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { ProductBuyModule } from './product_buy/product_buy.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',    
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
      }),
    }), DatabaseModule, TodoModule, UsersModule, ProductsModule, AuthModule, CartModule, ProductBuyModule],
    controllers: [AppController],
    providers: [AppService],
  })
  export class AppModule {}
  // envFilePath: '.env',
  // validationSchema: Joi.object({
  //   POSTGRES_HOST: Joi.string().required(),
  //   POSTGRES_PORT: Joi.number().required(),
  //   POSTGRES_USER: Joi.string().required(),
  //   POSTGRES_PASSWORD: Joi.string().required(),
  //   POSTGRES_DB: Joi.string().required(),
  //   PORT: Joi.number(),
  // })
