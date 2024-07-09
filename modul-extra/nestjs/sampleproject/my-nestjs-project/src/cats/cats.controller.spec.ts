import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cat } from './entities/cat.entity';

describe('CatsController', () => {
  let controller: CatsController;
  let service: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [
        {
          provide: CatsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CatsController>(CatsController);
    service = module.get<CatsService>(CatsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a cat', () => {
    const cat: Cat = { id: 1, name: 'Tom', age: 3, breed: 'Siamese' };
    jest.spyOn(service, 'create').mockImplementation(() => {});
    expect(controller.create(cat)).toEqual({
      message: 'Cat created successfully',
      success: true,
      data: cat,
    });
  });

  it('should return all cats', () => {
    const cat: Cat = { id: 1, name: 'Tom', age: 3, breed: 'Siamese' };
    jest.spyOn(service, 'findAll').mockImplementation(() => [cat]);
    expect(controller.findAll()).toEqual({
      message: 'Cats retrieved successfully',
      success: true,
      data: [cat],
    });
  });

  it('should find a cat by id', () => {
    const cat: Cat = { id: 1, name: 'Tom', age: 3, breed: 'Siamese' };
    jest.spyOn(service, 'findOne').mockImplementation(() => cat);
    expect(controller.findOne(1)).toEqual({
      message: 'Cat retrieved successfully',
      success: true,
      data: cat,
    });
  });

  it('should update a cat', () => {
    const cat: Cat = { id: 1, name: 'Tom', age: 4, breed: 'Siamese' };
    jest.spyOn(service, 'findOne').mockImplementation(() => cat);
    jest.spyOn(service, 'update').mockImplementation(() => {});
    expect(controller.update(1, { age: 4 })).toEqual({
      message: 'Cat updated successfully',
      success: true,
      data: { ...cat, age: 4 },
    });
  });

  it('should remove a cat', () => {
    const cat: Cat = { id: 1, name: 'Tom', age: 3, breed: 'Siamese' };
    jest.spyOn(service, 'findOne').mockImplementation(() => cat);
    jest.spyOn(service, 'remove').mockImplementation(() => {});
    expect(controller.remove(1)).toEqual({
      message: 'Cat removed successfully',
      success: true,
      data: cat,
    });
  });
});