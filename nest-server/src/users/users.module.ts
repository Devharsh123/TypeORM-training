import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './entities/user.entity';
import Balance from './entities/balance.entity';
import { CreateTransaction } from './create.transaction';
import { BaseTransaction } from './base.transaction';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Balance])],
  controllers: [UsersController],
  providers: [UsersService, CreateTransaction],
  exports: [UsersService]
})
export class UsersModule {}
