import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', () => {
    service.create({ name: 'Test User', email: 'test@example.com' });
    expect(service.findAll()).toEqual([{ name: 'Test User', email: 'test@example.com' }]);
  });

  it('should return all users', () => {
    service.create({ name: 'Test User', email: 'test@example.com' });
    service.create({ name: 'Another User', email: 'another@example.com' });
    expect(service.findAll()).toEqual([
      { name: 'Test User', email: 'test@example.com' },
      { name: 'Another User', email: 'another@example.com' },
    ]);
  });
});