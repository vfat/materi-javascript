### Bagian 4: Lanjutan (Advanced) NestJS

Setelah menguasai konsep-konsep intermediate, kita akan membahas fitur-fitur lanjutan dalam pembangunan aplikasi dengan NestJS. Bagian ini mencakup integrasi database, GraphQL, microservices, testing, dan optimisasi kinerja.

#### 1. Database Integration

Pada bagian ini, kita akan mempelajari cara mengintegrasikan NestJS dengan database menggunakan TypeORM sebagai ORM (Object-Relational Mapping). TypeORM adalah ORM yang mendukung TypeScript dan sangat populer untuk digunakan dengan NestJS. Kita akan menggunakan MySQL sebagai database.

#### Langkah-langkah:

#### 1.1. Instalasi TypeORM dan MySQL Driver

Pertama-tama, kita perlu menginstal TypeORM dan driver MySQL.

```bash
npm install --save @nestjs/typeorm typeorm mysql2
```

#### 1.2. Konfigurasi TypeORM

Selanjutnya, kita perlu mengkonfigurasi TypeORM dalam aplikasi NestJS kita. Edit file `app.module.ts` untuk mengimpor dan mengkonfigurasi TypeORM.

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

Penjelasan:
- `type: 'mysql'`: Menentukan tipe database yang digunakan.
- `host`, `port`, `username`, `password`, `database`: Konfigurasi koneksi ke database.
- `entities`: Path ke file entity yang digunakan oleh TypeORM.
- `synchronize: true`: Menyinkronkan skema database dengan entity setiap kali aplikasi dijalankan (hanya disarankan untuk pengembangan).

#### 1.3. Membuat Entity

Entity adalah representasi dari tabel database dalam kode. Buat file `cat.entity.ts` di dalam direktori `cats`.

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

Penjelasan:
- `@Entity()`: Menandai kelas sebagai entity.
- `@PrimaryGeneratedColumn()`: Menandai kolom sebagai primary key dengan auto-increment.
- `@Column()`: Menandai properti sebagai kolom tabel.

#### 1.4. Menggunakan Repository

Repository menyediakan metode untuk berinteraksi dengan entity. Edit `cats.service.ts` untuk menggunakan repository.

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

  async create(catData: { name: string; age: number; breed: string }): Promise<Cat> {
    const cat = this.catsRepository.create(catData);
    return this.catsRepository.save(cat);
  }

  findAll(): Promise<Cat[]> {
    return this.catsRepository.find();
  }

  findOne(id: number): Promise<Cat> {
    return this.catsRepository.findOne(id);
  }

  async update(id: number, updateCatDto: Partial<Cat>): Promise<Cat> {
    await this.catsRepository.update(id, updateCatDto);
    return this.catsRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.catsRepository.delete(id);
  }
}
```

Penjelasan:
- `@InjectRepository(Cat)`: Menginjeksikan repository untuk entity `Cat`.
- `this.catsRepository.create()`: Membuat instance baru dari entity `Cat`.
- `this.catsRepository.save()`: Menyimpan instance entity ke database.
- `this.catsRepository.find()`: Mengambil semua instance dari entity `Cat`.
- `this.catsRepository.findOne(id)`: Mengambil satu instance dari entity `Cat` berdasarkan id.
- `this.catsRepository.update(id, updateCatDto)`: Memperbarui instance entity `Cat` berdasarkan id.
- `this.catsRepository.delete(id)`: Menghapus instance entity `Cat` berdasarkan id.

#### 1.5. Menggunakan Service dalam Controller

Edit `cats.controller.ts` untuk menggunakan service.

```typescript
import { Controller, Get, Post, Body, Param, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './cat.entity';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    try {
      const cat = await this.catsService.create(createCatDto);
      return {
        message: 'Cat created successfully',
        success: true,
        data: cat,
      };
    } catch (error) {
      return {
        message: 'Failed to create cat',
        success: false,
        data: error.message,
      };
    }
  }

  @Get()
  async findAll() {
    try {
      const cats = await this.catsService.findAll();
      return {
        message: 'Cats retrieved successfully',
        success: true,
        data: cats,
      };
    } catch (error) {
      return {
        message: 'Failed to retrieve cats',
        success: false,
        data: error.message,
      };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      const cat = await this.catsService.findOne(id);
      if (!cat) {
        throw new HttpException('Cat not found', HttpStatus.NOT_FOUND);
      }
      return {
        message: 'Cat retrieved successfully',
        success: true,
        data: cat,
      };
    } catch (error) {
      return {
        message: 'Failed to retrieve cat',
        success: false,
        data: error.message,
      };
    }
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateCatDto: Partial<CreateCatDto>) {
    try {
      const cat = await this.catsService.findOne(id);
      if (!cat) {
        throw new HttpException('Cat not found', HttpStatus.NOT_FOUND);
      }
      const updatedCat = await this.catsService.update(id, updateCatDto);
      return {
        message: 'Cat updated successfully',
        success: true,
        data: updatedCat,
      };
    } catch (error) {
      return {
        message: 'Failed to update cat',
        success: false,
        data: error.message,
      };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      const cat = await this.catsService.findOne(id);
      if (!cat) {
        throw new HttpException('Cat not found', HttpStatus.NOT_FOUND);
      }
      await this.catsService.remove(id);
      return {
        message: 'Cat removed successfully',
        success: true,
        data: cat,
      };
    } catch (error) {
      return {
        message: 'Failed to remove cat',
        success: false,
        data: error.message,
      };
    }
  }
}
```

Penjelasan:
- `@Post()`, `@Get()`, `@Put()`, `@Delete()`: Mendefinisikan rute HTTP.
- Menggunakan service untuk membuat, mengambil, memperbarui, dan menghapus data.

Dengan langkah-langkah ini, Anda telah mengintegrasikan NestJS dengan database menggunakan TypeORM dan MySQL, membuat entity, repository, dan menggunakan service dalam controller untuk berinteraksi dengan database.

#### 2. GraphQL
GraphQL adalah bahasa query untuk API yang memungkinkan klien untuk meminta data yang mereka butuhkan dengan lebih efisien.

Tentu! Berikut adalah langkah-langkah terperinci untuk memulai proyek baru NestJS dengan integrasi GraphQL.

#### 2.1. Buat Proyek Baru NestJS

Mulai dengan membuat proyek baru menggunakan CLI NestJS:

```bash
npx @nestjs/cli new my-nestjs-graphql-project
cd my-nestjs-graphql-project
```

#### 2.2. Instalasi Paket yang Diperlukan

Instal paket yang diperlukan untuk menggunakan GraphQL dengan NestJS:

```bash
npm install @nestjs/graphql @nestjs/apollo graphql apollo-server-express
```

#### 2.3. Konfigurasi GraphQL di AppModule

Buka `src/app.module.ts` dan konfigurasikan GraphQL:

```typescript
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    CatsModule,
  ],
})
export class AppModule {}
```

#### 2.4. Membuat Module, Service, dan Resolver untuk Cats

#### 2.4.1. Buat Module dan Service

Gunakan CLI NestJS untuk membuat module dan service:

```bash
npx @nestjs/cli g module cats
npx @nestjs/cli g service cats
npx @nestjs/cli g resolver cats
```

#### 2.4.2. Definisikan Entity/Model Cat

Buat file `src/cats/entities/cat.entity.ts`:

```typescript
export class Cat {
  id: number;
  name: string;
  age: number;
  breed: string;
}
```

#### 2.4.3. Implementasi Service

Edit `src/cats/cats.service.ts`:

```typescript
import { Injectable } from '@nestjs/common';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat): Cat {
    this.cats.push(cat);
    return cat;
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findOne(id: number): Cat {
    return this.cats.find(cat => cat.id === id);
  }

  update(id: number, updateCatDto: Partial<Cat>): Cat {
    const catIndex = this.cats.findIndex(cat => cat.id === id);
    if (catIndex !== -1) {
      this.cats[catIndex] = { ...this.cats[catIndex], ...updateCatDto };
    }
    return this.cats[catIndex];
  }

  remove(id: number): void {
    const catIndex = this.cats.findIndex(cat => cat.id === id);
    if (catIndex !== -1) {
      this.cats.splice(catIndex, 1);
    }
  }
}
```

#### 2.4.4. Implementasi Resolver

Edit `src/cats/cats.resolver.ts`:

```typescript
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CatsService } from './cats.service';
import { Cat } from './entities/cat.entity';

@Resolver(() => Cat)
export class CatsResolver {
  constructor(private readonly catsService: CatsService) {}

  @Mutation(() => Cat)
  createCat(@Args('name') name: string, @Args('age', { type: () => Int }) age: number, @Args('breed') breed: string): Cat {
    const cat = new Cat();
    cat.name = name;
    cat.age = age;
    cat.breed = breed;
    return this.catsService.create(cat);
  }

  @Query(() => [Cat], { name: 'cats' })
  findAll(): Cat[] {
    return this.catsService.findAll();
  }

  @Query(() => Cat, { name: 'cat' })
  findOne(@Args('id', { type: () => Int }) id: number): Cat {
    return this.catsService.findOne(id);
  }

  @Mutation(() => Cat)
  updateCat(@Args('id', { type: () => Int }) id: number, @Args('name') name: string, @Args('age', { type: () => Int }) age: number, @Args('breed') breed: string): Cat {
    return this.catsService.update(id, { name, age, breed });
  }

  @Mutation(() => Boolean)
  removeCat(@Args('id', { type: () => Int }) id: number): boolean {
    this.catsService.remove(id);
    return true;
  }
}
```

#### 2.4.5. Update Entity untuk GraphQL

Edit `src/cats/entities/cat.entity.ts` untuk mendukung GraphQL:

```typescript
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Cat {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => Int)
  age: number;

  @Field()
  breed: string;
}
```

#### 2.5. Menjalankan Aplikasi

Sekarang Anda siap untuk menjalankan aplikasi Anda. Jalankan:

```bash
npm run start:dev
```

Anda dapat mengakses GraphQL Playground di `http://localhost:3000/graphql` dan mulai mengirimkan query dan mutation.

Contoh query:

```graphql
query {
  cats {
    id
    name
    age
    breed
  }
}

mutation {
  createCat(name: "Whiskers", age: 2, breed: "Siamese") {
    id
    name
    age
    breed
  }
}
```

Dengan mengikuti langkah-langkah ini, Anda sekarang memiliki aplikasi NestJS yang terintegrasi dengan GraphQL. Anda dapat melanjutkan dengan menambahkan fitur tambahan dan menyesuaikan skema GraphQL sesuai kebutuhan Anda.

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
