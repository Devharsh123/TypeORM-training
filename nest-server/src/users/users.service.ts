import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import User from './entities/user.entity';
import { HttpException } from '@nestjs/common';
@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRespository: Repository<User>){}
  async create(createUserDto: CreateUserDto): Promise<any> {
    const user = await this.userRespository.create(createUserDto);
    await this.userRespository.save(user);
    return { user };
    }

  async findAll(): Promise<User[]> {
   
    const users = await this.userRespository.find({
      select: {
        name: true,email: true, role: true, createdAt: true, updatedAt: true
      }
    }); 
    if(!users) {throw new HttpException(' users not found', HttpStatus.NOT_FOUND);}
    return users;
  }

  async findById(userId: number) {
    if(userId){
      return this.userRespository.findBy({id: userId})
    }
  }

  async findOne(email: string): Promise<User[]> {
    return await this.userRespository.findBy({email});
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userRespository.update(id, updateUserDto);
    const updatedUser = await this.userRespository.findBy({id});
    if(updatedUser){
      return updatedUser;
    }
    throw new HttpException('Updatedd user not found', HttpStatus.NOT_FOUND);
  }

  async remove(id: number): Promise<string> {
    const deletedUser = await this.userRespository.delete(id);
    if(!deletedUser.affected){
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return `this action removes a #${id} user`;
  }
}
