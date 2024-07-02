### Bagian 2: Dasar-dasar NestJS

#### 1. Controllers
Controllers adalah kelas yang bertanggung jawab untuk menangani permintaan dari klien dan mengembalikan respon yang sesuai. Setiap metode di dalam controller biasanya dikaitkan dengan route tertentu.

**Membuat dan Menggunakan Controller:**
Contoh controller sederhana:

```typescript
import { Controller, Get } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}
```

Penjelasan:
- **@Controller('cats')**: Mendeklarasikan route dasar untuk controller ini.
- **@Get()**: Mendeklarasikan route GET untuk metode `findAll`.

**Routing di NestJS:**
NestJS menggunakan dekorator seperti @Get(), @Post(), @Put(), @Delete() untuk menentukan metode HTTP yang di-handle oleh masing-masing metode dalam controller.

#### 2. Services
Services adalah kelas yang berisi logika bisnis dan bisa diakses oleh controller dan komponen lain dalam aplikasi. Service dapat menggunakan dependency injection untuk mendapatkan instance dari komponen lain yang dibutuhkan.

**Membuat dan Menggunakan Service:**
Contoh service sederhana:

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  findAll(): string {
    return 'This action returns all cats';
  }
}
```

Penjelasan:
- **@Injectable()**: Mendeklarasikan bahwa kelas ini dapat di-inject sebagai dependency.

**Menggunakan Service dalam Controller:**

```typescript
import { Controller, Get } from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  findAll(): string {
    return this.catsService.findAll();
  }
}
```

Penjelasan:
- **constructor(private readonly catsService: CatsService)**: Inject instance dari CatsService ke dalam CatsController.

#### 3. Modules
Modules adalah mekanisme untuk mengatur kode aplikasi menjadi unit yang dapat diatur dan digunakan kembali. Setiap aplikasi NestJS memiliki module root yang merupakan titik awal untuk komponen lainnya.

**Membuat dan Menggunakan Module:**
Contoh module sederhana:

```typescript
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
```

Penjelasan:
- **@Module()**: Mendeklarasikan bahwa ini adalah sebuah module.
- **controllers**: Daftar controller yang dimiliki oleh module ini.
- **providers**: Daftar service atau provider yang dimiliki oleh module ini.

**Menggunakan Module dalam Aplikasi:**

```typescript
import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
})
export class AppModule {}
```

Penjelasan:
- **imports**: Daftar module lain yang diimpor oleh module ini.

#### 4. Providers
Providers adalah semua class yang bisa di-inject sebagai dependency, yang dikelola oleh container NestJS. Ini bisa berupa services, repositories, factories, helpers, dsb.

**Scope Provider (Singleton, Request, Transient):**
- **Singleton (default)**: Satu instance di-share di seluruh aplikasi.
- **Request**: Satu instance per request.
- **Transient**: Instance baru setiap kali di-inject.

Contoh provider dengan scope:

```typescript
import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class CatsService {
  // ...
}
```

#### 5. DTOs (Data Transfer Objects) dan Validasi
DTOs adalah objek yang digunakan untuk membawa data antar proses dalam aplikasi. Validasi memastikan data yang diterima sesuai dengan aturan yang ditentukan.

**Membuat DTO:**

```typescript
export class CreateCatDto {
  name: string;
  age: number;
  breed: string;
}
```

**Validasi Menggunakan class-validator dan class-transformer:**

```typescript
import { IsString, IsInt } from 'class-validator';

export class CreateCatDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsString()
  breed: string;
}
```

**Menggunakan DTO dalam Controller:**

```typescript
import { Controller, Post, Body } from '@nestjs/common';
import { CreateCatDto } from './create-cat.dto';

@Controller('cats')
export class CatsController {
  @Post()
  create(@Body() createCatDto: CreateCatDto): string {
    return 'This action adds a new cat';
  }
}
```

Penjelasan:
- **@Body()**: Mendekorasi parameter untuk menerima data dari body request dan memvalidasinya menggunakan DTO.

---

Dengan memahami dasar-dasar ini, Anda sudah memiliki pondasi kuat untuk membangun aplikasi menggunakan NestJS. Selanjutnya, Anda bisa melanjutkan ke materi yang lebih intermediate seperti Middleware, Guards, Interceptors, Filters, dan Pipes.
