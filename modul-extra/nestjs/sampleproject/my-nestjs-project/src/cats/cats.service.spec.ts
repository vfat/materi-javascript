import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from './cats.service';
import { Cat } from './entities/cat.entity';

describe('CatsService', () => {
  let service: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatsService],
    }).compile();

    service = module.get<CatsService>(CatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a cat', () => {
    const cat: Cat = { id: 1, name: 'Tom', age: 3, breed: 'Siamese' };
    service.create(cat);
    expect(service.findAll()).toEqual([cat]);
  });

  it('should find a cat by id', () => {
    const cat: Cat = { id: 1, name: 'Tom', age: 3, breed: 'Siamese' };
    service.create(cat);
    expect(service.findOne(1)).toEqual(cat);
  });

  it('should update a cat', () => {
    const cat: Cat = { id: 1, name: 'Tom', age: 3, breed: 'Siamese' };
    service.create(cat);
    service.update(1, { age: 4 });
    expect(service.findOne(1).age).toEqual(4);
  });

  it('should remove a cat', () => {
    const cat: Cat = { id: 1, name: 'Tom', age: 3, breed: 'Siamese' };
    service.create(cat);
    service.remove(1);
    expect(service.findAll()).toEqual([]);
  });
});
