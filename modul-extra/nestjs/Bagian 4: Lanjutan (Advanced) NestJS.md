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
  createCat(@Args('id', { type: () => Int }) id: number, @Args('name') name: string, @Args('age', { type: () => Int }) age: number, @Args('breed') breed: string): Cat {
    const cat = new Cat();
    cat.id = id;
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

Setelah menjalankan aplikasi NestJS yang terintegrasi dengan GraphQL, Anda dapat melakukan berbagai hal untuk menguji dan memastikan bahwa aplikasi berjalan dengan benar. Berikut adalah beberapa langkah yang dapat Anda ambil untuk menguji aplikasi Anda.

#### 2.5.1. Mengakses GraphQL Playground

GraphQL Playground adalah antarmuka pengguna yang memungkinkan Anda mengirim query, mutation, dan subscription ke server GraphQL Anda.

- Buka browser dan navigasikan ke `http://localhost:3000/graphql`.
- Anda akan melihat antarmuka GraphQL Playground di mana Anda dapat mengirim query dan mutation.

#### 2.5.2. Mengirim Query dan Mutation

Gunakan GraphQL Playground untuk mengirim query dan mutation dan memastikan bahwa API Anda berfungsi dengan benar.

#### Contoh Mutation: Membuat Cat

```graphql
mutation {
  createCat(id:1, name: "Whiskers", age: 2, breed: "Siamese") {
    id
    name
    age
    breed
  }
}
```

#### Contoh Query: Mendapatkan Semua Cats

```graphql
query {
  cats {
    id
    name
    age
    breed
  }
}
```

#### Contoh Query: Mendapatkan Cat berdasarkan ID

```graphql
query {
  cat(id: 1) {
    id
    name
    age
    breed
  }
}
```

#### 2.5.3. Menguji dengan Unit Testing

NestJS mendukung unit testing menggunakan Jest. Anda dapat menulis tes untuk memastikan bahwa layanan dan resolver Anda bekerja dengan benar.

#### 2.5.3.1. Membuat Unit Test untuk Service

Buat file `src/cats/cats.service.spec.ts` dan tambahkan tes berikut:

```typescript
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
    expect(service.findAll()).toContain(cat);
  });

  it('should return all cats', () => {
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
    const updatedCat = service.update(1, { age: 4 });
    expect(updatedCat.age).toEqual(4);
  });

  it('should remove a cat', () => {
    const cat: Cat = { id: 1, name: 'Tom', age: 3, breed: 'Siamese' };
    service.create(cat);
    service.remove(1);
    expect(service.findAll()).not.toContain(cat);
  });
});
```

#### 2.5.3.2. Membuat Unit Test untuk Resolver

Buat file `src/cats/cats.resolver.spec.ts` dan tambahkan tes berikut:

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { CatsResolver } from './cats.resolver';
import { CatsService } from './cats.service';
import { Cat } from './entities/cat.entity';

describe('CatsResolver', () => {
  let resolver: CatsResolver;
  let service: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatsResolver,
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

    resolver = module.get<CatsResolver>(CatsResolver);
    service = module.get<CatsService>(CatsService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create a cat', () => {
    const cat: Cat = { id: 1, name: 'Tom', age: 3, breed: 'Siamese' };
    jest.spyOn(service, 'create').mockImplementation(() => cat);
    expect(resolver.createCat('Tom', 3, 'Siamese')).toEqual(cat);
  });

  it('should return all cats', () => {
    const cat: Cat = { id: 1, name: 'Tom', age: 3, breed: 'Siamese' };
    jest.spyOn(service, 'findAll').mockImplementation(() => [cat]);
    expect(resolver.findAll()).toEqual([cat]);
  });

  it('should find a cat by id', () => {
    const cat: Cat = { id: 1, name: 'Tom', age: 3, breed: 'Siamese' };
    jest.spyOn(service, 'findOne').mockImplementation(() => cat);
    expect(resolver.findOne(1)).toEqual(cat);
  });

  it('should update a cat', () => {
    const cat: Cat = { id: 1, name: 'Tom', age: 3, breed: 'Siamese' };
    jest.spyOn(service, 'update').mockImplementation(() => ({ ...cat, age: 4 }));
    expect(resolver.updateCat(1, 'Tom', 4, 'Siamese')).toEqual({ ...cat, age: 4 });
  });

  it('should remove a cat', () => {
    jest.spyOn(service, 'remove').mockImplementation(() => true);
    expect(resolver.removeCat(1)).toEqual(true);
  });
});
```

#### 2.5.4. Menjalankan Tes

Anda dapat menjalankan semua tes yang telah Anda tulis dengan perintah berikut:

```bash
npm run test
```

#### 2.5.5. Menggunakan Tools Pengujian Lainnya

#### 2.5.5.1. Postman

Postman adalah alat yang bagus untuk menguji endpoint GraphQL. Anda dapat mengirim query dan mutation ke endpoint GraphQL Anda (`http://localhost:3000/graphql`) dan memeriksa respons yang diterima.

#### 2.5.5.2. Insomnia

Insomnia adalah alat lain yang mirip dengan Postman dan mendukung GraphQL. Anda dapat menggunakannya untuk mengirim query dan mutation serta memeriksa respons dari server GraphQL Anda.

Dengan mengikuti langkah-langkah ini, Anda dapat memastikan bahwa aplikasi NestJS Anda yang terintegrasi dengan GraphQL berjalan dengan baik dan memenuhi kebutuhan Anda. Anda juga dapat menulis dan menjalankan tes untuk memverifikasi bahwa setiap bagian dari aplikasi Anda berfungsi seperti yang diharapkan.

Dengan mengikuti langkah-langkah ini, Anda sekarang memiliki aplikasi NestJS yang terintegrasi dengan GraphQL. Anda dapat melanjutkan dengan menambahkan fitur tambahan dan menyesuaikan skema GraphQL sesuai kebutuhan Anda.

#### 3. Microservices

Mikroservis adalah arsitektur perangkat lunak yang memecah aplikasi menjadi layanan-layanan kecil yang dapat dikembangkan, diuji, dan di-deploy secara independen. Dalam konteks NestJS, Anda dapat membangun mikroservis dengan berbagai transportasi, seperti Redis, MQTT, NATS, dan lainnya. Berikut ini adalah panduan lengkap untuk membangun mikroservis dengan NestJS menggunakan Redis sebagai transportasi.

#### 3.1. Microservices dengan TCP

Menggunakan TCP sebagai transportasi untuk mikroservis adalah salah satu metode yang bisa diandalkan untuk komunikasi antar layanan dalam NestJS. Berikut ini adalah panduan lengkap untuk membuat dan mengonfigurasi mikroservis dengan menggunakan TCP.

#### 3.1.1. Langkah-langkah Membuat Proyek Mikroservis dengan NestJS menggunakan TCP

1. **Membuat Proyek Baru**
   
   Buat proyek baru menggunakan CLI NestJS:
   ```bash
   nest new microservice-project
   ```

2. **Menyiapkan Mikroservis**

   Buat direktori `services` untuk menampung mikroservis:
   ```bash
   mkdir -p src/services/users
   ```

   Tambahkan modul, controller, dan service untuk mikroservis `users`:
   ```bash
   nest generate module services/users
   nest generate service services/users
   nest generate controller services/users
   ```

3. **Instalasi Dependencies Mikroservis**

   Instal dependencies yang diperlukan:
   ```bash
   npm install --save @nestjs/microservices
   ```

4. **Konfigurasi Mikroservis**

   Buat file `src/main.ts` untuk konfigurasi mikroservis:
   ```typescript
   import { NestFactory } from '@nestjs/core';
   import { AppModule } from './app.module';
   import { MicroserviceOptions, Transport } from '@nestjs/microservices';

   async function bootstrap() {
     const app = await NestFactory.create(AppModule);

     const microserviceOptions: MicroserviceOptions = {
       transport: Transport.TCP,
       options: {
         host: '127.0.0.1',
         port: 8877,
       },
     };

     app.connectMicroservice(microserviceOptions);

     await app.startAllMicroservices();
     await app.listen(3000);
   }
   bootstrap();
   ```

5. **Membuat Service untuk Mikroservis**

   Edit file `src/services/users/users.service.ts`:
   ```typescript
   import { Injectable } from '@nestjs/common';

   @Injectable()
   export class UsersService {
     private users = [];

     create(user) {
       this.users.push(user);
     }

     findAll() {
       return this.users;
     }
   }
   ```

6. **Membuat Controller untuk Mikroservis**

   Edit file `src/services/users/users.controller.ts`:
   ```typescript
   import { Controller } from '@nestjs/common';
   import { UsersService } from './users.service';
   import { MessagePattern } from '@nestjs/microservices';

   @Controller()
   export class UsersController {
     constructor(private readonly usersService: UsersService) {}

     @MessagePattern({ cmd: 'create_user' })
     createUser(user) {
       this.usersService.create(user);
       return { status: 'User created successfully' };
     }

     @MessagePattern({ cmd: 'get_users' })
     getUsers() {
       return this.usersService.findAll();
     }
   }
   ```

7. **Membuat Client untuk Berkomunikasi dengan Mikroservis**

   Tambahkan controller dan service untuk client dalam `src/app.controller.ts` dan `src/app.service.ts`:

   Edit file `src/app.controller.ts`:
   ```typescript
   import { Controller, Get, Post, Body } from '@nestjs/common';
   import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
   import { AppService } from './app.service';

   @Controller()
   export class AppController {
     private client: ClientProxy;

     constructor(private readonly appService: AppService) {
       this.client = ClientProxyFactory.create({
         transport: Transport.TCP,
         options: {
           host: '127.0.0.1',
           port: 8877,
         },
       });
     }

     @Post('create')
     async create(@Body() user) {
       return this.client.send({ cmd: 'create_user' }, user).toPromise();
     }

     @Get('users')
     async getUsers() {
       return this.client.send({ cmd: 'get_users' }, {}).toPromise();
     }
   }
   ```

   Edit file `src/app.service.ts`:
   ```typescript
   import { Injectable } from '@nestjs/common';

   @Injectable()
   export class AppService {}
   ```

8. **Menjalankan Aplikasi**

   Jalankan aplikasi NestJS:
   ```bash
   npm run start
   ```

#### 3.1.2. Menguji Mikroservis

1. **Menguji Endpoint Create User**

   Gunakan tools seperti Postman atau curl untuk mengirim request POST ke endpoint `create`:
   ```bash
   curl -X POST http://localhost:3000/create -H "Content-Type: application/json" -d '{"name":"John Doe","email":"john@example.com"}'
   ```

2. **Menguji Endpoint Get Users**

   Gunakan tools seperti Postman atau curl untuk mengirim request GET ke endpoint `users`:
   ```bash
   curl http://localhost:3000/users
   ```

3. **Menguji dengan Unit Test**

   Buat file test untuk `users.service.ts`:
   ```typescript
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
   ```

#### 3.1.3. Kesimpulan

Dengan mengikuti langkah-langkah di atas, Anda telah berhasil membuat, mengonfigurasi, dan menguji mikroservis di NestJS menggunakan TCP sebagai transportasi. Panduan ini memberikan dasar yang kuat untuk membangun arsitektur mikroservis yang lebih kompleks dan terukur. Anda dapat menambahkan lebih banyak fitur atau layanan dengan membuat modul dan controller tambahan serta mengonfigurasi transportasi yang sesuai.

#### 3.2. Microservices dengan Redis

Menggunakan Docker untuk menjalankan Redis membuat setup lebih mudah dan terisolasi dari sistem utama Anda. Berikut adalah panduan langkah demi langkah untuk membuat dan mengonfigurasi mikroservis dengan menggunakan Redis di NestJS, dengan Redis berjalan di Docker.

#### 3.2.1. Langkah-langkah Membuat Proyek Mikroservis dengan NestJS menggunakan Redis dan Docker

1. **Membuat Proyek Baru**

   Buat dua proyek baru menggunakan CLI NestJS:
   ```bash
   nest new main-service
   nest new microservice
   ```

2. **Instalasi Redis**

   Instal dependencies yang diperlukan:
   ```bash
   cd main-service
   npm install --save @nestjs/microservices redis
   cd ../microservice
   npm install --save @nestjs/microservices redis
   ```

3. **Menyiapkan Redis Server dengan Docker**

   Jalankan Redis server menggunakan Docker:
   ```bash
   docker run --name redis -p 6379:6379 -d redis
   ```

4. **Konfigurasi Mikroservis**

   Di proyek `microservice`, edit file `src/main.ts` untuk konfigurasi mikroservis menggunakan Redis:
   ```typescript
   import { NestFactory } from '@nestjs/core';
   import { AppModule } from './app.module';
   import { MicroserviceOptions, Transport } from '@nestjs/microservices';

   async function bootstrap() {
     const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
       transport: Transport.REDIS,
       options: {
         url: 'redis://localhost:6379',
       },
     });

     await app.listen();
   }
   bootstrap();
   ```

   Buat service dan controller untuk menangani pesan di mikroservis:
   ```bash
   nest generate service app
   nest generate controller app
   ```

   Edit file `src/app.service.ts`:
   ```typescript
   import { Injectable } from '@nestjs/common';
   import { MessagePattern } from '@nestjs/microservices';

   @Injectable()
   export class AppService {
     @MessagePattern({ cmd: 'greet' })
     greet(name: string): string {
       return `Hello, ${name}!`;
     }
   }
   ```

5. **Konfigurasi Main Service**

   Di proyek `main-service`, edit file `src/main.ts` untuk menghubungkan ke mikroservis menggunakan Redis:
   ```typescript
   import { NestFactory } from '@nestjs/core';
   import { AppModule } from './app.module';
   import { MicroserviceOptions, Transport } from '@nestjs/microservices';

   async function bootstrap() {
     const app = await NestFactory.create(AppModule);

     const microserviceOptions: MicroserviceOptions = {
       transport: Transport.REDIS,
       options: {
         url: 'redis://localhost:6379',
       },
     };

     app.connectMicroservice(microserviceOptions);

     await app.startAllMicroservices();
     await app.listen(3000);
   }
   bootstrap();
   ```

   Buat service dan controller untuk mengirim pesan ke mikroservis di main-service:
   ```bash
   nest generate service app
   nest generate controller app
   ```

   Edit file `src/app.service.ts`:
   ```typescript
   import { Injectable, OnModuleInit } from '@nestjs/common';
   import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
   import { Observable } from 'rxjs';

   @Injectable()
   export class AppService implements OnModuleInit {
     private client: ClientProxy;

     onModuleInit() {
       this.client = ClientProxyFactory.create({
         transport: Transport.REDIS,
         options: {
           url: 'redis://localhost:6379',
         },
       });
     }

     sendMessage(pattern: string, data: any): Observable<any> {
       return this.client.send({ cmd: pattern }, data);
     }
   }
   ```

   Edit file `src/app.controller.ts`:
   ```typescript
   import { Controller, Get, Query } from '@nestjs/common';
   import { AppService } from './app.service';

   @Controller()
   export class AppController {
     constructor(private readonly appService: AppService) {}

     @Get('greet')
     greet(@Query('name') name: string) {
       return this.appService.sendMessage('greet', name);
     }
   }
   ```

6. **Menjalankan Aplikasi**

   Jalankan kedua proyek:
   ```bash
   cd main-service
   npm run start
   cd ../microservice
   npm run start
   ```

7. **Menguji Aplikasi**

   Gunakan browser atau alat seperti Postman untuk mengakses endpoint:
   ```bash
   http://localhost:3000/greet?name=John
   ```

   Anda akan menerima respons dari mikroservis melalui Redis.

#### 3.2.2. Kesimpulan

Dengan mengikuti langkah-langkah di atas, Anda telah berhasil membuat dan mengonfigurasi mikroservis di NestJS menggunakan Redis sebagai transportasi, dengan Redis berjalan di Docker. Panduan ini memberikan dasar yang kuat untuk membangun arsitektur mikroservis yang lebih kompleks dan terukur. Anda dapat menambahkan lebih banyak fitur atau layanan dengan membuat modul dan controller tambahan serta mengonfigurasi transportasi yang sesuai.

#### 3.3. Microservices dengan gRPC

gRPC adalah framework RPC modern yang menggunakan protokol buffer (protobuf) untuk serialisasi data. Ini memberikan performa tinggi dan mendukung berbagai bahasa pemrograman. Berikut ini adalah panduan lengkap untuk membuat dan mengonfigurasi mikroservis dengan menggunakan gRPC di NestJS.

#### 3.3.1. Langkah-langkah Membuat Proyek Mikroservis dengan NestJS menggunakan gRPC

1. **Membuat Proyek Baru**

   Buat proyek baru menggunakan CLI NestJS:
   ```bash
   nest new grpc-microservice-project
   ```

2. **Menyiapkan Struktur Direktori**

   Buat direktori `services` untuk menampung mikroservis:
   ```bash
   mkdir -p src/services/users
   ```

   Tambahkan modul, controller, dan service untuk mikroservis `users`:
   ```bash
   nest generate module services/users
   nest generate service services/users
   nest generate controller services/users
   ```

3. **Instalasi Dependencies gRPC**

   Instal dependencies yang diperlukan:
   ```bash
   npm install --save @nestjs/microservices @grpc/grpc-js @grpc/proto-loader
   ```

4. **Membuat File Protobuf**

   Buat file `src/services/users/users.proto` untuk mendefinisikan layanan gRPC:
   ```protobuf
   syntax = "proto3";

   package users;

   service UsersService {
     rpc CreateUser (CreateUserRequest) returns (UserResponse);
     rpc GetUsers (Empty) returns (UsersResponse);
   }

   message Empty {}

   message CreateUserRequest {
     string name = 1;
     string email = 2;
   }

   message User {
     string id = 1;
     string name = 2;
     string email = 3;
   }

   message UserResponse {
     User user = 1;
   }

   message UsersResponse {
     repeated User users = 1;
   }
   ```

5. **Konfigurasi gRPC di Aplikasi Utama**

   Edit file `src/main.ts` untuk konfigurasi gRPC:
   ```typescript
   import { NestFactory } from '@nestjs/core';
   import { AppModule } from './app.module';
   import { MicroserviceOptions, Transport } from '@nestjs/microservices';
   import { join } from 'path';

   async function bootstrap() {
     const app = await NestFactory.create(AppModule);

     const microserviceOptions: MicroserviceOptions = {
       transport: Transport.GRPC,
       options: {
         package: 'users',
         protoPath: join(__dirname, 'services/users/users.proto'),
       },
     };

     app.connectMicroservice(microserviceOptions);

     await app.startAllMicroservices();
     await app.listen(3000);
   }
   bootstrap();
   ```

6. **Membuat Service untuk Mikroservis**

   Edit file `src/services/users/users.service.ts`:
   ```typescript
   import { Injectable } from '@nestjs/common';
   import { User } from './interfaces/user.interface';

   @Injectable()
   export class UsersService {
     private users: User[] = [];

     create(user: User) {
       this.users.push(user);
       return user;
     }

     findAll() {
       return this.users;
     }
   }
   ```

7. **Membuat Controller untuk Mikroservis**

   Edit file `src/services/users/users.controller.ts`:
   ```typescript
   import { Controller } from '@nestjs/common';
   import { GrpcMethod } from '@nestjs/microservices';
   import { UsersService } from './users.service';
   import { CreateUserRequest, User, Empty } from './interfaces/user.interface';

   @Controller()
   export class UsersController {
     constructor(private readonly usersService: UsersService) {}

     @GrpcMethod('UsersService', 'CreateUser')
     createUser(data: CreateUserRequest, metadata: any): User {
       return this.usersService.create(data);
     }

     @GrpcMethod('UsersService', 'GetUsers')
     getUsers(data: Empty, metadata: any) {
       return { users: this.usersService.findAll() };
     }
   }
   ```

8. **Menambahkan Interface untuk gRPC**

   Tambahkan file `src/services/users/interfaces/user.interface.ts` untuk mendefinisikan interface:
   ```typescript
   export interface CreateUserRequest {
     name: string;
     email: string;
   }

   export interface User {
     id: string;
     name: string;
     email: string;
   }

   export interface Empty {}

   export interface UserResponse {
     user: User;
   }

   export interface UsersResponse {
     users: User[];
   }
   ```

9. **Menjalankan Aplikasi**

   Jalankan aplikasi NestJS:
   ```bash
   npm run start
   ```

#### 3.3.2. Menguji Mikroservis

1. **Membuat Client gRPC untuk Menguji**

   Buat file `src/client.ts` untuk menguji gRPC service:
   ```typescript
   import * as grpc from '@grpc/grpc-js';
   import * as protoLoader from '@grpc/proto-loader';
   import { join } from 'path';

   const PROTO_PATH = join(__dirname, 'services/users/users.proto');
   const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
     keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true,
   });

   const usersProto = grpc.loadPackageDefinition(packageDefinition).users;

   const client = new usersProto.UsersService('localhost:5000', grpc.credentials.createInsecure());

   client.CreateUser({ name: 'John Doe', email: 'john@example.com' }, (err, response) => {
     if (err) console.error(err);
     console.log('User created:', response);
   });

   client.GetUsers({}, (err, response) => {
     if (err) console.error(err);
     console.log('Users:', response);
   });
   ```

2. **Menguji dengan Client gRPC**

   Jalankan client gRPC:
   ```bash
   ts-node src/client.ts
   ```

#### 3.3.3. Kesimpulan

Dengan mengikuti langkah-langkah di atas, Anda telah berhasil membuat, mengonfigurasi, dan menguji mikroservis di NestJS menggunakan gRPC sebagai transportasi. Panduan ini memberikan dasar yang kuat untuk membangun arsitektur mikroservis yang lebih kompleks dan terukur. Anda dapat menambahkan lebih banyak fitur atau layanan dengan membuat modul dan controller tambahan serta mengonfigurasi transportasi yang sesuai.

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
