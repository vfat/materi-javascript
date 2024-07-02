### Bagian 5.1: Studi Kasus dan Proyek Akhir (dengan graphQL)

Pada bagian ini, kita akan mengaplikasikan semua konsep yang telah dipelajari dalam sebuah proyek nyata. Studi kasus ini akan mencakup pembuatan aplikasi manajemen kucing dengan fitur lengkap seperti CRUD operasi, autentikasi, otorisasi, dan integrasi dengan GraphQL serta database. 

#### Studi Kasus: Aplikasi Manajemen Kucing

##### 1. Persiapan dan Setup Proyek
Pertama, kita akan membuat proyek NestJS baru dan mengatur struktur dasarnya.

**Membuat Proyek Baru:**

```bash
nest new cat-management
```

**Instalasi Dependensi Tambahan:**

```bash
npm install --save @nestjs/typeorm typeorm mysql2 @nestjs/jwt passport-jwt @nestjs/passport passport @nestjs/graphql graphql-tools graphql class-validator class-transformer
```

##### 2. Konfigurasi Database dengan TypeORM

**Konfigurasi Database di `app.module.ts`:**

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { CatsModule } from './cats/cats.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'cat_management',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    CatsModule,
    AuthModule,
  ],
})
export class AppModule {}
```

##### 3. Membuat Modul, Entity, Service, dan Controller untuk Kucing

**Membuat Entity untuk Kucing:**

```typescript
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  breed: string;
}
```

**Membuat Service untuk Kucing:**

```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './cat.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>,
  ) {}

  findAll(): Promise<Cat[]> {
    return this.catsRepository.find();
  }

  findOne(id: number): Promise<Cat> {
    return this.catsRepository.findOne(id);
  }

  create(cat: Cat): Promise<Cat> {
    return this.catsRepository.save(cat);
  }

  async update(id: number, cat: Cat): Promise<void> {
    await this.catsRepository.update(id, cat);
  }

  async remove(id: number): Promise<void> {
    await this.catsRepository.delete(id);
  }
}
```

**Membuat Controller untuk Kucing:**

```typescript
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './cat.entity';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Cat> {
    return this.catsService.findOne(id);
  }

  @Post()
  create(@Body() cat: Cat): Promise<Cat> {
    return this.catsService.create(cat);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() cat: Cat): Promise<void> {
    return this.catsService.update(id, cat);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.catsService.remove(id);
  }
}
```

##### 4. Implementasi Autentikasi dan Otorisasi

**Membuat Auth Module dan Service:**

**Auth Module:**

```typescript
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
```

**Auth Service:**

```typescript
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    // Implementasi validasi user
    const user = { userId: 1, username: 'test' };
    return user;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
```

**Jwt Strategy:**

```typescript
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secretKey',
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
```

**Menggunakan Guard dalam Controller:**

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('cats')
export class CatsController {
  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(): string {
    return 'This action returns all cats';
  }
}
```

##### 5. Integrasi GraphQL

**Membuat Resolver untuk Kucing:**

```typescript
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CatsService } from './cats.service';
import { Cat } from './cat.entity';

@Resolver(of => Cat)
export class CatsResolver {
  constructor(private catsService: CatsService) {}

  @Query(returns => [Cat])
  async cats() {
    return this.catsService.findAll();
  }

  @Mutation(returns => Cat)
  async addCat(
    @Args('name') name: string,
    @Args('age') age: number,
    @Args('breed') breed: string,
  ) {
    const cat = new Cat();
    cat.name = name;
    cat.age = age;
    cat.breed = breed;
    return this.catsService.create(cat);
  }
}
```

##### 6. Testing Aplikasi

**Unit Test untuk Service:**

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from './cats.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Cat } from './cat.entity';
import { Repository } from 'typeorm';

describe('CatsService', () => {
  let service: CatsService;
  let repository: Repository<Cat>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatsService,
        {
          provide: getRepositoryToken(Cat),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CatsService>(CatsService);
    repository = module.get<Repository<Cat>>(getRepositoryToken(Cat));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of cats', async () => {
    const result = [{ name: 'Test Cat', age: 2, breed: 'Test Breed' }];
    jest.spyOn(repository, 'find').mockResolvedValue(result);

    expect(await service.findAll()).toBe(result);
  });
});
```

##### 7. Deploy dan Optimisasi

**Deploy Aplikasi:**

Aplikasi dapat dideploy ke berbagai platform seperti Heroku, AWS, atau VPS sendiri. Pastikan untuk mengatur variabel lingkungan dan konfigurasi database dengan benar.

**Optimisasi Kinerja:**

- **Caching:** Implementasi caching untuk mengurangi beban pada database.
- **Load Balancing:** Menggunakan load balancer untuk mendistribusikan beban aplikasi.
- **Profiling dan Monitoring:** Menggunakan alat monitoring untuk memantau performa aplikasi.

---

Dengan menyelesaikan studi kasus ini, Anda akan memiliki pengalaman praktis dalam membangun aplikasi lengkap dengan NestJS. Anda telah menerapkan berbagai konsep dari dasar hingga lanjutan dan siap untuk mengembangkan aplikasi kompleks lainnya dengan menggunakan NestJS.
