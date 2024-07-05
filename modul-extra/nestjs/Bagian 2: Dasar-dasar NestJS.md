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

#### Praktik

### Bagian 1 dan 2: Pengantar dan Dasar-dasar NestJS

Pada bagian ini, kita akan membuat proyek NestJS sederhana dan menyiapkan CRUD dasar. Kami juga akan membahas bagaimana menguji endpoint menggunakan Postman atau Thunder Client.

#### Bagian 1: Pengantar NestJS

1. **Instalasi NestJS CLI:**

   Pertama, pastikan Anda memiliki Node.js dan npm terinstal di sistem Anda. Instal NestJS CLI secara global:

   ```bash
   npm install -g @nestjs/cli
   ```

2. **Membuat Proyek Baru:**

   Buat proyek NestJS baru:

   ```bash
   nest new my-nest-project
   ```

   Ikuti petunjuk untuk memilih manajer paket yang ingin Anda gunakan (npm atau yarn).

3. **Menjalankan Proyek:**

   Setelah proyek dibuat, navigasikan ke direktori proyek dan jalankan aplikasi:

   ```bash
   cd my-nest-project
   npm run start
   ```

   Aplikasi Anda sekarang berjalan di `http://localhost:3000`.

#### Bagian 2: Dasar-dasar NestJS

1. **Membuat Modul, Controller, dan Service:**

   Kami akan membuat modul, controller, dan service untuk entitas `Cats`.

   **Membuat Modul Kucing:**

   ```bash
   nest generate module cats
   ```

   **Membuat Controller Kucing:**

   ```bash
   nest generate controller cats
   ```

   **Membuat Service Kucing:**

   ```bash
   nest generate service cats
   ```

2. **Mengimplementasikan Service dan Controller:**

   **cats.service.ts:**

   ```typescript
   import { Injectable } from '@nestjs/common';

   export interface Cat {
     id: number;
     name: string;
     age: number;
     breed: string;
   }

   @Injectable()
   export class CatsService {
     private readonly cats: Cat[] = [];

     create(cat: Cat) {
       this.cats.push(cat);
     }

     findAll(): Cat[] {
       return this.cats;
     }

     findOne(id: number): Cat {
       return this.cats.find(cat => cat.id === id);
     }

     update(id: number, updateCatDto: Partial<Cat>) {
       const catIndex = this.cats.findIndex(cat => cat.id === id);
       if (catIndex !== -1) {
         this.cats[catIndex] = { ...this.cats[catIndex], ...updateCatDto };
       }
     }

     remove(id: number) {
       const catIndex = this.cats.findIndex(cat => cat.id === id);
       if (catIndex !== -1) {
         this.cats.splice(catIndex, 1);
       }
     }
   }
   ```

   **cats.controller.ts:**

   ```typescript
   import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
   import { CatsService, Cat } from './cats.service';

   @Controller('cats')
   export class CatsController {
     constructor(private readonly catsService: CatsService) {}

     @Post()
     create(@Body() createCatDto: Cat) {
       this.catsService.create(createCatDto);
     }

     @Get()
     findAll(): Cat[] {
       return this.catsService.findAll();
     }

     @Get(':id')
     findOne(@Param('id') id: number): Cat {
       return this.catsService.findOne(id);
     }

     @Put(':id')
     update(@Param('id') id: number, @Body() updateCatDto: Partial<Cat>) {
       this.catsService.update(id, updateCatDto);
     }

     @Delete(':id')
     remove(@Param('id') id: number) {
       this.catsService.remove(id);
     }
   }
   ```

3. **Menjalankan Aplikasi dan Menguji dengan Postman atau Thunder Client:**

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
         "id": 1,
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

---

Dengan mengikuti langkah-langkah di atas, Anda telah membuat proyek NestJS sederhana dengan CRUD dasar untuk entitas `Cats` dan mengujinya menggunakan Postman atau Thunder Client. Ini memberikan dasar yang kuat untuk melanjutkan ke bagian yang lebih kompleks dalam NestJS.


---
EXTRAS
---

Untuk membuat route seperti `http://localhost:3000/cats/umur/:umur/warna/:warna` di NestJS, Anda bisa mengikuti langkah-langkah berikut:

1. **Buat Module dan Controller**:
   - Pertama, buat module dan controller untuk `cats`. 
   - Anda bisa melakukannya secara manual atau menggunakan CLI NestJS untuk menghasilkan boilerplate kode.

2. **Deklarasikan Route di Controller**:
   - Di dalam controller, deklarasikan metode dengan dekorator `@Get()` yang sesuai dengan route yang diinginkan.

Berikut adalah contoh langkah-langkahnya:

### Langkah 1: Buat Module dan Controller
Anda dapat menggunakan CLI NestJS untuk membuat module dan controller:

```bash
nest generate module cats
nest generate controller cats
```

### Langkah 2: Definisikan Route di Controller

Edit file `cats.controller.ts` untuk menambahkan route yang diinginkan:

```typescript
import { Controller, Get, Param } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get('umur/:umur/warna/:warna')
  findCatsByUmurAndWarna(@Param('umur') umur: string, @Param('warna') warna: string) {
    return `Cats with umur: ${umur} and warna: ${warna}`;
  }
}
```

### Penjelasan:
- `@Controller('cats')`: Menentukan prefix `cats` untuk semua route di controller ini.
- `@Get('umur/:umur/warna/:warna')`: Menentukan route GET yang akan menangkap parameter `umur` dan `warna`.
- `@Param('umur') umur: string`: Mengambil nilai parameter `umur` dari URL.
- `@Param('warna') warna: string`: Mengambil nilai parameter `warna` dari URL.

### Langkah 3: Registrasikan Module
Pastikan module `CatsModule` diimport di dalam `AppModule`:

```typescript
import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
})
export class AppModule {}
```

### Langkah 4: Jalankan Aplikasi
Jalankan aplikasi dengan perintah:

```bash
npm run start
```

Sekarang, Anda bisa mengakses route `http://localhost:3000/cats/umur/:umur/warna/:warna` dan melihat output yang sesuai.

### Struktur Proyek
Setelah mengikuti langkah-langkah di atas, struktur proyek Anda akan terlihat seperti ini:

```
src/
│
├── cats/
│   ├── cats.controller.ts
│   ├── cats.module.ts
│
├── app.module.ts
├── main.ts
```

Dengan langkah-langkah ini, Anda akan dapat membuat route dinamis di NestJS yang menangkap parameter dari URL.
