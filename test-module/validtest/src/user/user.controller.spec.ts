import { Test, TestingModule } from '@nestjs/testing';
import { data } from './user';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should be created', () => {
    expect(controller.create({"id":8,"name":"jawahar","class":"job","isDone":true})).toBe('This action adds a new user as 8');
  });
  it('should findall data', () => {
    expect(controller.findAll()).toStrictEqual(data);
  });
  it('should findone data', () => {
    expect(controller.findOne("4")).toStrictEqual({"class": "job", "id": 4, "isDone": true, "name": "harsh"});
  });
  it('should remove data', () => {
    expect(controller.remove("4")).toBe('This action removes a #4 user');
    expect(controller.findAll()).toStrictEqual(data);
  });
  
});
