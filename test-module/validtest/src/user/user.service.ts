import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import User from './entities/user.entity';
import { data } from './user';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}
  async create(createUserDto: CreateUserDto) {
    const store = await this.userRepository.create(createUserDto)
    await this.userRepository.save(store)
    return `This action adds a new user as ${createUserDto.id}`;
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findBy({id});
    // return data.find(element=> element.id = id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const dataToUpdate = data.find(element => element.id = id)

    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return this.userRepository.delete(id); 
    // const dataToBeRemoved = data.findIndex(a=>a.id === id)
    // data.splice(dataToBeRemoved,1)
    return `This action removes a #${id} user`;
  }
}
