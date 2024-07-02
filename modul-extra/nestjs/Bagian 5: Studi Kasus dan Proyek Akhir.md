### Bagian 5: Studi Kasus dan Proyek Akhir

Pada bagian ini, kita akan menerapkan semua konsep yang telah dipelajari dalam pembuatan aplikasi nyata. Studi kasus ini melibatkan pembuatan aplikasi manajemen kucing dengan fitur CRUD, autentikasi, otorisasi, dan integrasi database MySQL menggunakan Prisma.

#### Studi Kasus: Aplikasi Manajemen Kucing

##### 1. Persiapan dan Setup Proyek

**Membuat Proyek Baru:**

Buat proyek baru menggunakan NestJS CLI:

```bash
nest new cat-management
```

**Instalasi Dependensi Tambahan:**

```bash
npm install @nestjs/prisma @prisma/client prisma @nestjs/jwt passport-jwt @nestjs/passport passport class-validator class-transformer
```

**Inisialisasi Prisma:**

```bash
npx prisma init
```

Ini akan membuat folder `prisma` dengan file `schema.prisma` dan file `.env`.

##### 2. Konfigurasi Prisma

**Update file `.env` dengan informasi koneksi database:**

```
DATABASE_URL="mysql://root:password@localhost:3306/cat_management"
```

**Edit `prisma/schema.prisma`:**

```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Cat {
  id    Int    @id @default(autoincrement())
  name  String
  age   Int
  breed String
}
```

**Generate Prisma Client:**

```bash
npx prisma migrate dev --name init
npx prisma generate
```

##### 3. Membuat Modul, Service, dan Controller untuk Kucing

**Membuat Prisma Module dan Service:**

**Prisma Module:**

```typescript
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
```

**Prisma Service:**

```typescript
import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
```

**Membuat Cats Module, Service, dan Controller:**

**Cats Module:**

```typescript
import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [CatsService],
  controllers: [CatsController],
})
export class CatsModule {}
```

**Cats Service:**

```typescript
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Cat } from '@prisma/client';

@Injectable()
export class CatsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Cat[]> {
    return this.prisma.cat.findMany();
  }

  async findOne(id: number): Promise<Cat> {
    return this.prisma.cat.findUnique({ where: { id } });
  }

  async create(data: Cat): Promise<Cat> {
    return this.prisma.cat.create({ data });
  }

  async update(id: number, data: Partial<Cat>): Promise<Cat> {
    return this.prisma.cat.update({ where: { id }, data });
  }

  async remove(id: number): Promise<Cat> {
    return this.prisma.cat.delete({ where: { id } });
  }
}
```

**Cats Controller:**

```typescript
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from '@prisma/client';

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
  update(@Param('id') id: number, @Body() cat: Partial<Cat>): Promise<Cat> {
    return this.catsService.update(id, cat);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<Cat> {
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
import { UsersModule } from '../users/users.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '60m' },
    }),
    PrismaModule,
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
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
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
  findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
```

##### 5. Integrasi GraphQL

**Instalasi Paket GraphQL:**

```bash
npm install @nestjs/graphql graphql-tools graphql
```

**Konfigurasi GraphQL di `app.module.ts`:**

```typescript
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    // Other modules
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
  ],
})
export class AppModule {}
```

**Membuat Resolver untuk Kucing:**

```typescript
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CatsService } from './cats.service';
import { Cat } from '@prisma/client';

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
    const cat = { name, age, breed };
    return this.catsService.create(cat);
  }
}
```

##### 6. Testing Aplikasi

**Unit Test untuk Service:**

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from './cats.service';
import { PrismaService } from '../prisma/prisma.service';
import { Cat } from '@prisma/client';

describe('CatsService', () => {
  let service: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatsService,
        PrismaService,
      ],
    }).compile();

    service = module.get<CatsService>(CatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array

 of cats', async () => {
    const result = [{ name: 'Test Cat', age: 2, breed: 'Test Breed' }];
    jest.spyOn(service, 'findAll').mockResolvedValue(result);

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

Dengan menyelesaikan studi kasus ini, Anda akan memiliki pengalaman praktis dalam membangun aplikasi lengkap dengan NestJS dan Prisma. Anda telah menerapkan berbagai konsep dari dasar hingga lanjutan dan siap untuk mengembangkan aplikasi kompleks lainnya dengan menggunakan NestJS dan Prisma.
