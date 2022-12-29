import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import Todo from './entities/todo.entity';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class TodoService {
  constructor(@InjectRepository(Todo) private todoRepository: Repository<Todo>) {}

  async create(createTodoDto: CreateTodoDto) {
    const todo = await this.todoRepository.create(createTodoDto);
    await this.todoRepository.save(todo);
    return { todo };
  }

  async findAll() {
    return await this.todoRepository.find();
  }

  async findOne(id: number) {
    const todo = await this.todoRepository.findBy({id});
    if(todo){
    return todo;
    }
    throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    await this.todoRepository.update(id,updateTodoDto);
    const updateTodo = await this.todoRepository.findBy({id});
    if(updateTodo) {
      return updateTodo
    }
    throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
  }

  async remove(id: number) {
    const todo = await this.todoRepository.delete(id);
    if(!todo.affected){
      throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }
    
    return `This action removes a #${id} todo`;
  }
}
