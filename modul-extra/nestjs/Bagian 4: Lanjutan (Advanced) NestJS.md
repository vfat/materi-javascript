### Bagian 4: Lanjutan (Advanced) NestJS

Setelah menguasai konsep-konsep intermediate, kita akan membahas fitur-fitur lanjutan dalam pembangunan aplikasi dengan NestJS. Bagian ini mencakup integrasi database, GraphQL, microservices, testing, dan optimisasi kinerja.

#### 1. Database Integration
Integrasi dengan database adalah bagian penting dalam pembangunan aplikasi yang memerlukan penyimpanan dan pengambilan data.

**Menggunakan TypeORM dengan NestJS:**
TypeORM adalah ORM yang mendukung TypeScript dan merupakan salah satu pilihan yang populer untuk digunakan dengan NestJS.

**Instalasi TypeORM dan Database Driver:**

```bash
npm install --save @nestjs/typeorm typeorm mysql2
```

**Konfigurasi TypeORM:**

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'test',
      password: 'test',
      database: 'test',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    CatsModule,
  ],
})
export class AppModule {}
```

**Membuat Entity:**

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

**Menggunakan Repository:**

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

  findOne(id: string): Promise<Cat> {
    return this.catsRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.catsRepository.delete(id);
  }
}
```

#### 2. GraphQL
GraphQL adalah bahasa query untuk API yang memungkinkan klien untuk meminta data yang mereka butuhkan dengan lebih efisien.

**Menggunakan GraphQL dengan NestJS:**

**Instalasi Paket GraphQL:**

```bash
npm install --save @nestjs/graphql graphql-tools graphql
```

**Konfigurasi GraphQL:**

```typescript
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    CatsModule,
  ],
})
export class AppModule {}
```

**Membuat Schema dan Resolver:**

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

#### 3. Microservices
Microservices adalah arsitektur yang memisahkan aplikasi menjadi layanan-layanan kecil yang bisa dikembangkan, dideploy, dan diskalakan secara independen.

**Membuat Microservice:**

**Instalasi Paket Microservices:**

```bash
npm install --save @nestjs/microservices
```

**Konfigurasi Microservice:**

```typescript
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CatsService } from './cats.service';

@Module({
  imports: [
    ClientsModule.register([
      { name: 'CATS_SERVICE', transport: Transport.TCP },
    ]),
  ],
  providers: [CatsService],
})
export class CatsModule {}
```

**Komunikasi Antar Microservices:**

```typescript
import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class CatsService {
  constructor(@Inject('CATS_SERVICE') private client: ClientProxy) {}

  createCat(cat) {
    return this.client.send({ cmd: 'createCat' }, cat);
  }
}
```

#### 4. Testing
Testing adalah bagian penting dalam pembangunan aplikasi untuk memastikan kode berfungsi sesuai dengan yang diharapkan.

**Unit Testing dengan Jest:**

**Instalasi Jest:**

```bash
npm install --save-dev jest @types/jest ts-jest
```

**Konfigurasi Jest:**

```json
{
  "jest": {
    "moduleFileExtensions": ["js", "json", "ts"],
    "rootDir": "src",
    "testRegex": ".*\\.spec\\.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": ["**/*.(t|j)s"],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node"
  }
}
```

**Unit Testing untuk Service:**

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from './cats.service';

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

  it('should return an array of cats', async () => {
    const result = ['test'];
    jest.spyOn(service, 'findAll').mockImplementation(() => result);

    expect(await service.findAll()).toBe(result);
  });
});
```

#### 5. Performance Optimization
Optimisasi kinerja penting untuk memastikan aplikasi berjalan dengan efisien dan responsif.

**Teknik Caching:**

Menggunakan caching untuk mengurangi beban pada database dan meningkatkan kecepatan respons.

**Menggunakan Cache Interceptor:**

```typescript
import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [CacheModule.register()],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
```

**Implementasi Caching dalam Controller:**

```typescript
import { Controller, Get, UseInterceptors, CacheInterceptor } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get()
  @UseInterceptors(CacheInterceptor)
  findAll(): string {
    return 'This action returns all cats';
  }
}
```

**Load Balancing:**

Menggunakan load balancer untuk mendistribusikan beban aplikasi ke beberapa instance.

**Monitoring dan Profiling:**

Menggunakan alat monitoring seperti Prometheus, Grafana, atau New Relic untuk memantau performa aplikasi dan mengidentifikasi bottleneck.

**Profiling Kode:**

Menggunakan alat profiling untuk menganalisis kinerja kode dan mengoptimalkan bagian-bagian yang membutuhkan perbaikan.

---

Dengan mempelajari fitur-fitur lanjutan ini, Anda akan dapat membangun aplikasi yang lebih robust, scalable, dan efisien menggunakan NestJS. Bagian selanjutnya akan fokus pada studi kasus dan proyek akhir untuk mengaplikasikan seluruh konsep yang telah dipelajari.
