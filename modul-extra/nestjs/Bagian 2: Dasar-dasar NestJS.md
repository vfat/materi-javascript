### Bagian 2: Dasar-dasar NestJS

#### 1. Controllers

Controllers adalah kelas yang bertanggung jawab untuk menangani permintaan dari klien dan mengembalikan respons yang sesuai. Setiap metode di dalam controller biasanya dikaitkan dengan route tertentu.

**Membuat dan Menggunakan Controller:**

Pertama, buat proyek baru jika belum dibuat:

```bash
nest new bagian-dua-project
cd bagian-dua-project
```

Kemudian buat module, service, dan controller untuk entitas `cats`:

```bash
nest generate module cats
nest generate controller cats
nest generate service cats
```

**Contoh Controller Sederhana:**

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

**Penjelasan:**

- `@Controller('cats')`: Mendeklarasikan route dasar untuk controller ini.
- `@Get()`: Mendeklarasikan route GET untuk metode `findAll`.

NestJS menggunakan dekorator seperti `@Get()`, `@Post()`, `@Put()`, `@Delete()` untuk menentukan metode HTTP yang di-handle oleh masing-masing metode dalam controller.

#### 2. Services

Services adalah kelas yang berisi logika bisnis dan bisa diakses oleh controller dan komponen lain dalam aplikasi. Service dapat menggunakan dependency injection untuk mendapatkan instance dari komponen lain yang dibutuhkan.

**Contoh Service Sederhana:**

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  findAll(): string {
    return 'This action returns all cats';
  }
}
```

**Penjelasan:**

- `@Injectable()`: Mendeklarasikan bahwa kelas ini dapat di-inject sebagai dependency.

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

**Penjelasan:**

- `constructor(private readonly catsService: CatsService)`: Inject instance dari `CatsService` ke dalam `CatsController`.

#### 3. Modules

Modules adalah mekanisme untuk mengatur kode aplikasi menjadi unit yang dapat diatur dan digunakan kembali. Setiap aplikasi NestJS memiliki module root yang merupakan titik awal untuk komponen lainnya.

**Contoh Module Sederhana:**

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

**Penjelasan:**

- `@Module()`: Mendeklarasikan bahwa ini adalah sebuah module.
- `controllers`: Daftar controller yang dimiliki oleh module ini.
- `providers`: Daftar service atau provider yang dimiliki oleh module ini.

**Menggunakan Module dalam Aplikasi:**

```typescript
import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
})
export class AppModule {}
```

**Penjelasan:**

- `imports`: Daftar module lain yang diimpor oleh module ini.

#### 4. Providers

Providers adalah semua class yang bisa di-inject sebagai dependency, yang dikelola oleh container NestJS. Ini bisa berupa services, repositories, factories, helpers, dsb.

**Scope Provider (Singleton, Request, Transient):**

- Singleton (default): Satu instance di-share di seluruh aplikasi.
- Request: Satu instance per request.
- Transient: Instance baru setiap kali di-inject.

**Contoh Provider dengan Scope:**

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

**Validasi Menggunakan `class-validator` dan `class-transformer`:**

Pertama, instal dependensi:

```bash
npm install class-validator class-transformer
```

**DTO dengan Validasi:**

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

**Penjelasan:**

- `@Body()`: Mendekorasi parameter untuk menerima data dari body request dan memvalidasinya menggunakan DTO.

#### Menjalankan Aplikasi dan Menguji dengan Postman atau Thunder Client

**Menjalankan Aplikasi:**

```bash
npm run start
```

**Menggunakan Postman atau Thunder Client:**

- **POST** untuk membuat kucing:
  - URL: `http://localhost:3000/cats`
  - Body (JSON):
    ```json
    {
      "name": "Whiskers",
      "age": 3,
      "breed": "Siamese"
    }
    ```

- **GET** untuk mendapatkan semua kucing:
  - URL: `http://localhost:3000/cats`

- **GET** untuk mendapatkan kucing berdasarkan ID:
  - URL: `http://localhost:3000/cats/1`

- **PUT** untuk memperbarui kucing:
  - URL: `http://localhost:3000/cats/1`
  - Body (JSON):
    ```json
    {
      "age": 4
    }
    ```

- **DELETE** untuk menghapus kucing:
  - URL: `http://localhost:3000/cats/1`

Dengan mengikuti langkah-langkah di atas, Anda telah membuat proyek NestJS sederhana dengan CRUD dasar untuk entitas `Cats` dan mengujinya menggunakan Postman atau Thunder Client. Ini memberikan dasar yang kuat untuk melanjutkan ke bagian yang lebih kompleks dalam NestJS.
