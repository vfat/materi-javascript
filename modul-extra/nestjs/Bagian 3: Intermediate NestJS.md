## Bagian 3: Intermediate NestJS

Pada bagian ini, kita akan mendalami konsep-konsep lebih lanjut yang akan membantu Anda mengembangkan aplikasi NestJS yang lebih kompleks dan efisien. Berikut adalah beberapa topik yang akan kita bahas:

1. **Middleware**
2. **Interceptors**
3. **Guards**
4. **Pipes**
5. **Filters**
6. **Database dengan TypeORM**

### 1. Middleware


Middleware di NestJS adalah fungsi yang dijalankan sebelum handler rute. Middleware dapat melakukan berbagai tugas seperti logging, autentikasi, atau modifikasi objek permintaan dan respons.

#### Kapan Menggunakan Middleware
- **Pre-processing**: Saat Anda perlu memproses permintaan sebelum mencapai route handler, seperti logging, otentikasi, atau parsing body.
- **Post-processing**: Saat Anda perlu memproses respons sebelum dikirim kembali ke klien.
- **Global**: Middleware sering diterapkan di seluruh aplikasi untuk fungsi yang perlu dijalankan untuk setiap permintaan, seperti CORS atau rate limiting.
- **Kustomisasi**: Jika Anda memiliki logika umum yang perlu diterapkan di banyak endpoint, middleware adalah tempat yang tepat untuk itu.


#### Penggunaan Middleware di NestJS

1. **Membuat Middleware**
2. **Mendaftarkan Middleware**
3. **Menambahkan Middleware di Modul Utama**

#### 1.1. Membuat Middleware

Langkah pertama adalah membuat middleware baru. Misalkan kita ingin membuat middleware logging yang mencatat informasi tentang setiap permintaan yang masuk.

**Langkah-langkah:**

1. Buat direktori `middleware` di dalam direktori `cats`.

2. Buat file `logger.middleware.ts` di dalam direktori `middleware` tersebut.

3. Tambahkan kode berikut ke `logger.middleware.ts`:

```typescript
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction): void {
    const { method, originalUrl } = req;
    const start = Date.now();

    res.on('finish', () => {
      const { statusCode } = res;
      const duration = Date.now() - start;
      this.logger.log(`${method} ${originalUrl} ${statusCode} - ${duration}ms`);
    });

    next();
  }
}
```

Penjelasan:
- `LoggerMiddleware` adalah middleware yang mencatat metode HTTP, URL asli, kode status respons, dan durasi permintaan.
- `res.on('finish', ...)` digunakan untuk menjalankan log setelah respons dikirim.

#### 1.2. Mendaftarkan Middleware

Middleware perlu didaftarkan untuk digunakan dalam aplikasi. Ini bisa dilakukan di modul utama atau di modul tertentu.

**Langkah-langkah:**

1. Buka `app.module.ts`.

2. Modifikasi kode untuk mendaftarkan middleware:

```typescript
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './cats/middleware/logger.middleware';

@Module({
  imports: [CatsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
```

Penjelasan:
- `AppModule` mengimplementasikan `NestModule` untuk mengonfigurasi middleware.
- `configure` digunakan untuk mendaftarkan middleware menggunakan `MiddlewareConsumer`.
- `forRoutes('*')` menyatakan bahwa middleware ini akan dijalankan untuk semua rute.

#### 1.3. Menguji Middleware

Untuk memastikan middleware berfungsi dengan baik, kita bisa menggunakan Postman atau Thunder Client untuk mengirim permintaan ke server kita.

**Langkah-langkah:**

1. Jalankan aplikasi NestJS Anda:
   ```bash
   npm run start
   ```

2. Buka Postman atau Thunder Client.

3. Kirim permintaan GET ke `http://localhost:3000/cats`.

4. Periksa log di terminal di mana aplikasi NestJS berjalan. Anda akan melihat log dari middleware:

```
[Nest] 12345  - 01/01/2023, 12:34:56 PM     LOG [HTTP] GET /cats 200 - 15ms
```

Penjelasan:
- Middleware akan mencatat informasi tentang setiap permintaan yang diterima oleh server, termasuk metode HTTP, URL, kode status respons, dan durasi permintaan.

#### Contoh Kode Lengkap

**logger.middleware.ts:**

```typescript
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction): void {
    const { method, originalUrl } = req;
    const start = Date.now();

    res.on('finish', () => {
      const { statusCode } = res;
      const duration = Date.now() - start;
      this.logger.log(`${method} ${originalUrl} ${statusCode} - ${duration}ms`);
    });

    next();
  }
}
```

**app.module.ts:**

```typescript
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './cats/middleware/logger.middleware';

@Module({
  imports: [CatsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
```

Dengan penjelasan ini, Anda sekarang memiliki pemahaman yang lebih mendalam tentang bagaimana middleware bekerja di NestJS dan bagaimana menggunakannya untuk menambahkan fitur logging ke aplikasi Anda.

### 2. Interceptors

Interceptors di NestJS adalah kelas yang memungkinkan Anda mengganggu atau memodifikasi aliran permintaan atau respons di aplikasi Anda. Mereka bisa digunakan untuk berbagai tujuan seperti logging, transformasi data, cache, dan lainnya.

#### Kapan Menggunakan Interceptor
- **Pre-processing dan Post-processing**: Interceptor memungkinkan Anda memanipulasi permintaan sebelum mencapai handler dan respons setelah handler memprosesnya.
- **Transformasi Data**: Gunakan interceptor untuk mengubah data respons dalam cara yang seragam.
- **Error Handling**: Interceptor dapat menangkap kesalahan yang terjadi selama eksekusi dan mengubah atau menangani kesalahan tersebut sebelum dikirim ke klien.
- **Cross-Cutting Concerns**: Untuk logika lintas-cutter seperti logging, caching, atau otentikasi yang perlu diterapkan di berbagai titik dalam aplikasi.

#### Penggunaan Interceptors di NestJS

1. **Membuat Interceptor**
2. **Mendaftarkan Interceptor**
3. **Menggunakan Interceptor dalam Controller atau Global**

#### 2.1. Membuat Interceptor

Langkah pertama adalah membuat interceptor baru. Misalkan kita ingin membuat interceptor yang mencatat waktu eksekusi dari setiap permintaan.

**Langkah-langkah:**

1. Buat direktori `interceptors` di dalam direktori `cats`.

2. Buat file `logging.interceptor.ts` di dalam direktori `interceptors`.

3. Tambahkan kode berikut ke `logging.interceptor.ts`:

```typescript
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => console.log(`After... ${Date.now() - now}ms`))
      );
  }
}
```

Penjelasan:
- `LoggingInterceptor` adalah interceptor yang mencatat waktu eksekusi permintaan.
- `intercept` adalah metode yang diimplementasikan untuk mengintersepsi permintaan dan respons.
- `tap` dari RxJS digunakan untuk menjalankan log setelah permintaan selesai diproses.

#### 2.2. Mendaftarkan Interceptor

Interceptor dapat didaftarkan secara global, dalam modul, atau untuk metode tertentu dalam controller.

#### a. Mendaftarkan Interceptor secara Global

1. Buka `main.ts`.

2. Modifikasi kode untuk mendaftarkan interceptor secara global:

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './cats/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(3000);
}
bootstrap();
```

Penjelasan:
- `useGlobalInterceptors` digunakan untuk mendaftarkan interceptor secara global sehingga akan diterapkan pada semua rute di aplikasi.

#### b. Mendaftarkan Interceptor pada Modul

1. Buka `cats.module.ts`.

2. Modifikasi kode untuk mendaftarkan interceptor:

```typescript
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

@Module({
  controllers: [CatsController],
  providers: [
    CatsService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class CatsModule {}
```

Penjelasan:
- `APP_INTERCEPTOR` digunakan untuk mendaftarkan interceptor di tingkat modul.

#### c. Menggunakan Interceptor dalam Controller atau Metode

1. Buka `cats.controller.ts`.

2. Tambahkan kode untuk menggunakan interceptor di controller atau metode tertentu:

```typescript
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { CatsService, Cat } from './cats.service';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

@Controller('cats')
@UseInterceptors(LoggingInterceptor) // Menerapkan interceptor pada seluruh controller
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  findAll(): Cat[] {
    return this.catsService.findAll();
  }
}
```

Penjelasan:
- `@UseInterceptors` digunakan untuk menerapkan interceptor pada controller atau metode tertentu.

#### 2.3. Menguji Interceptor

Untuk memastikan interceptor berfungsi dengan baik, kita bisa menggunakan Postman atau Thunder Client untuk mengirim permintaan ke server kita.

**Langkah-langkah:**

1. Jalankan aplikasi NestJS Anda:
   ```bash
   npm run start
   ```

2. Buka Postman atau Thunder Client.

3. Kirim permintaan GET ke `http://localhost:3000/cats`.

4. Periksa log di terminal di mana aplikasi NestJS berjalan. Anda akan melihat log dari interceptor:

```
After... 5ms
```

Penjelasan:
- Interceptor akan mencatat waktu yang dibutuhkan untuk menyelesaikan permintaan.

#### Contoh Kode Lengkap

**logging.interceptor.ts:**

```typescript
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => console.log(`After... ${Date.now() - now}ms`))
      );
  }
}
```

**main.ts (Global Interceptor):**

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './cats/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(3000);
}
bootstrap();
```

**cats.module.ts (Module-level Interceptor):**

```typescript
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

@Module({
  controllers: [CatsController],
  providers: [
    CatsService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class CatsModule {}
```

**cats.controller.ts (Controller-level Interceptor):**

```typescript
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { CatsService, Cat } from './cats.service';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

@Controller('cats')
@UseInterceptors(LoggingInterceptor)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  findAll(): Cat[] {
    return this.catsService.findAll();
  }
}
```

Dengan penjelasan ini, Anda sekarang memiliki pemahaman yang lebih mendalam tentang bagaimana interceptors bekerja di NestJS dan bagaimana menggunakannya untuk menambahkan fitur logging ke aplikasi Anda.
    ```

### 3. Guards

Guards di NestJS digunakan untuk menentukan apakah permintaan tertentu harus diproses oleh route handler atau tidak. Mereka sangat berguna untuk otentikasi dan otorisasi. Guards berfungsi seperti middleware tetapi memiliki prioritas yang lebih tinggi dan dapat digunakan untuk mengontrol alur permintaan berdasarkan logika tertentu.

#### Kapan Menggunakan Guards
- **Otorisasi Pengguna**: Gunakan guards untuk memeriksa apakah pengguna memiliki izin atau hak akses yang diperlukan untuk mengakses rute tertentu.
- **Otentikasi Pengguna**: Gunakan guards untuk memastikan bahwa pengguna sudah terotentikasi sebelum mengizinkan akses ke rute tertentu.
- **Validasi Kondisi Khusus**: Gunakan guards untuk memvalidasi kondisi khusus yang perlu dipenuhi sebelum mengizinkan akses ke rute tertentu. seperti waktu, status pengguna dsb
- **Penggunaan Metadata**: Gunakan guards bersama dengan metadata untuk menentukan logika otorisasi yang dinamis.

#### Langkah-langkah Menggunakan Guards di NestJS

1. **Membuat Guard**
2. **Mendaftarkan Guard**
3. **Menggunakan Guard dalam Controller atau Global**

#### 3.1. Membuat Guard

Langkah pertama adalah membuat guard baru. Misalkan kita ingin membuat guard sederhana yang memeriksa apakah permintaan memiliki header khusus yang berisi token.

**Langkah-langkah:**

1. Buat direktori `guards` di dalam direktori `cats`.

2. Buat file `auth.guard.ts` di dalam direktori `guards`.

3. Tambahkan kode berikut ke `auth.guard.ts`:

```typescript
import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];

    if (!token) {
      throw new HttpException('Authorization token is missing', HttpStatus.UNAUTHORIZED);
    }

    // Here you would normally validate the token
    if (token !== 'valid-token') {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    return true;
  }
}
```

Penjelasan:
- `AuthGuard` adalah guard yang memeriksa apakah permintaan memiliki header `authorization` yang valid.
- `canActivate` adalah metode yang mengembalikan `true` jika permintaan diizinkan untuk melanjutkan, atau melempar `HttpException` jika tidak.

#### 3.2. Mendaftarkan Guard

Guard dapat didaftarkan secara global, dalam modul, atau untuk metode tertentu dalam controller.

#### a. Mendaftarkan Guard secara Global

1. Buka `main.ts`.

2. Modifikasi kode untuk mendaftarkan guard secara global:

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from './cats/guards/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new AuthGuard());
  await app.listen(3000);
}
bootstrap();
```

Penjelasan:
- `useGlobalGuards` digunakan untuk mendaftarkan guard secara global sehingga akan diterapkan pada semua rute di aplikasi.

#### b. Mendaftarkan Guard pada Modul

1. Buka `cats.module.ts`.

2. Modifikasi kode untuk mendaftarkan guard:

```typescript
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { AuthGuard } from './guards/auth.guard';

@Module({
  controllers: [CatsController],
  providers: [
    CatsService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class CatsModule {}
```

Penjelasan:
- `APP_GUARD` digunakan untuk mendaftarkan guard di tingkat modul.

#### c. Menggunakan Guard dalam Controller atau Metode

1. Buka `cats.controller.ts`.

2. Tambahkan kode untuk menggunakan guard di controller atau metode tertentu:

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { CatsService, Cat } from './cats.service';
import { AuthGuard } from './guards/auth.guard';

@Controller('cats')
@UseGuards(AuthGuard) // Menerapkan guard pada seluruh controller
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  findAll(): Cat[] {
    return this.catsService.findAll();
  }
}
```

Penjelasan:
- `@UseGuards` digunakan untuk menerapkan guard pada controller atau metode tertentu.

#### 3.3. Menguji Guard

Untuk memastikan guard berfungsi dengan baik, kita bisa menggunakan Postman atau Thunder Client untuk mengirim permintaan ke server kita.

**Langkah-langkah:**

1. Jalankan aplikasi NestJS Anda:
   ```bash
   npm run start
   ```

2. Buka Postman atau Thunder Client.

3. Kirim permintaan GET ke `http://localhost:3000/cats` tanpa header `authorization`.

4. Anda akan mendapatkan respons dengan status 401 Unauthorized:

```json
{
  "statusCode": 401,
  "message": "Authorization token is missing"
}
```

5. Kirim permintaan GET ke `http://localhost:3000/cats` dengan header `authorization: valid-token`.

6. Anda akan mendapatkan respons yang sesuai:

```json
{
  "message": "Cats retrieved successfully",
  "success": true,
  "data": []
}
```

Penjelasan:
- Guard akan memeriksa apakah header `authorization` ada dan valid sebelum mengizinkan permintaan untuk melanjutkan.

#### Contoh Kode Lengkap

**auth.guard.ts:**

```typescript
import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];

    if (!token) {
      throw new HttpException('Authorization token is missing', HttpStatus.UNAUTHORIZED);
    }

    // Here you would normally validate the token
    if (token !== 'valid-token') {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    return true;
  }
}
```

**main.ts (Global Guard):**

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from './cats/guards/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new AuthGuard());
  await app.listen(3000);
}
bootstrap();
```

**cats.module.ts (Module-level Guard):**

```typescript
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { AuthGuard } from './guards/auth.guard';

@Module({
  controllers: [CatsController],
  providers: [
    CatsService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class CatsModule {}
```

**cats.controller.ts (Controller-level Guard):**

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { CatsService, Cat } from './cats.service';
import { AuthGuard } from './guards/auth.guard';

@Controller('cats')
@UseGuards(AuthGuard)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  findAll(): Cat[] {
    return this.catsService.findAll();
  }
}
```

Dengan penjelasan ini, Anda sekarang memiliki pemahaman yang lebih mendalam tentang bagaimana guards bekerja di NestJS dan bagaimana menggunakannya untuk menambahkan fitur otentikasi dan otorisasi ke aplikasi Anda.

### 4. Pipes

Pipes di NestJS digunakan untuk melakukan transformasi dan validasi pada data yang masuk ke handler. Mereka sangat berguna untuk memastikan bahwa data yang diterima sesuai dengan harapan sebelum diproses lebih lanjut.

#### Kapan Menggunakan Pipes
- **Validasi Data**: Gunakan pipes untuk memvalidasi data masuk sesuai dengan DTO atau skema validasi lain.
- **Transformasi Data**: Gunakan pipes untuk mentransformasi data, seperti mengubah string menjadi integer, objek, atau tipe data lain yang diperlukan.
- **Global vs. Lokal**: Gunakan pipes global untuk kebutuhan validasi dan transformasi yang konsisten di seluruh aplikasi. Gunakan pipes lokal untuk kebutuhan khusus di controller atau handler tertentu.
- **Kustomisasi**: Buat custom pipes jika Anda memiliki kebutuhan validasi atau transformasi data yang tidak bisa dipenuhi oleh pipes bawaan NestJS.


#### Langkah-langkah Menggunakan Pipes di NestJS

1. **Membuat Pipe Kustom**
2. **Mendaftarkan Pipe**
3. **Menggunakan Pipe dalam Controller atau Global**

#### 4.1. Membuat Pipe Kustom

Langkah pertama adalah membuat pipe baru. Misalkan kita ingin membuat pipe yang memvalidasi data input untuk membuat entitas `Cat`.

**Langkah-langkah:**

1. Buat direktori `pipes` di dalam direktori `cats`.

2. Buat file `validate-cat.pipe.ts` di dalam direktori `pipes`.

3. Tambahkan kode berikut ke `validate-cat.pipe.ts`:

```typescript
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { CreateCatDto } from '../dto/create-cat.dto';
import * as Joi from 'joi';

@Injectable()
export class ValidateCatPipe implements PipeTransform {
  private readonly schema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    age: Joi.number().required(),
    breed: Joi.string().required(),
  });

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value);
    if (error) {
      throw new BadRequestException(`Validation failed: ${error.message}`);
    }
    return value;
  }
}
```

Penjelasan:
- `ValidateCatPipe` adalah pipe yang memvalidasi data input menggunakan `Joi`.
- `transform` adalah metode yang mengembalikan nilai yang divalidasi jika valid, atau melempar `BadRequestException` jika tidak valid.

#### 4.2. Mendaftarkan Pipe

Pipe dapat didaftarkan secara global, dalam modul, atau untuk metode tertentu dalam controller.

#### a. Mendaftarkan Pipe secara Global

1. Buka `main.ts`.

2. Modifikasi kode untuk mendaftarkan pipe secara global:

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidateCatPipe } from './cats/pipes/validate-cat.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidateCatPipe());
  await app.listen(3000);
}
bootstrap();
```

Penjelasan:
- `useGlobalPipes` digunakan untuk mendaftarkan pipe secara global sehingga akan diterapkan pada semua rute di aplikasi.

#### b. Menggunakan Pipe dalam Controller atau Metode

1. Buka `cats.controller.ts`.

2. Tambahkan kode untuk menggunakan pipe di controller atau metode tertentu:

```typescript
import { Controller, Get, Post, Body, Param, Put, Delete, UsePipes } from '@nestjs/common';
import { CatsService, Cat } from './cats.service';
import { ValidateCatPipe } from './pipes/validate-cat.pipe';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @UsePipes(ValidateCatPipe) // Menerapkan pipe pada metode tertentu
  create(@Body() createCatDto: Cat) {
    try {
      this.catsService.create(createCatDto);
      return {
        message: 'Cat created successfully',
        success: true,
        data: createCatDto,
      };
    } catch (error) {
      return {
        message: 'Failed to create cat',
        success: false,
        data: error.message,
      };
    }
  }

  // Metode lainnya tetap sama
}
```

Penjelasan:
- `@UsePipes` digunakan untuk menerapkan pipe pada metode tertentu.

#### 4.3. Menguji Pipe

Untuk memastikan pipe berfungsi dengan baik, kita bisa menggunakan Postman atau Thunder Client untuk mengirim permintaan ke server kita.

**Langkah-langkah:**

1. Jalankan aplikasi NestJS Anda:
   ```bash
   npm run start
   ```

2. Buka Postman atau Thunder Client.

3. Kirim permintaan POST ke `http://localhost:3000/cats` dengan body yang valid:

```json
{
  "id": 1,
  "name": "Tom",
  "age": 3,
  "breed": "Siamese"
}
```

4. Anda akan mendapatkan respons yang sesuai:

```json
{
  "message": "Cat created successfully",
  "success": true,
  "data": {
    "id": 1,
    "name": "Tom",
    "age": 3,
    "breed": "Siamese"
  }
}
```

5. Kirim permintaan POST ke `http://localhost:3000/cats` dengan body yang tidak valid:

```json
{
  "id": 1,
  "name": "Tom",
  "age": "three",
  "breed": "Siamese"
}
```

6. Anda akan mendapatkan respons dengan status 400 Bad Request:

```json
{
  "statusCode": 400,
  "message": "Validation failed: \"age\" must be a number"
}
```

Penjelasan:
- Pipe akan memvalidasi data input sebelum diteruskan ke handler. Jika data tidak valid, pipe akan melemparkan pengecualian.

#### Contoh Kode Lengkap

**validate-cat.pipe.ts:**

```typescript
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { CreateCatDto } from '../dto/create-cat.dto';
import * as Joi from 'joi';

@Injectable()
export class ValidateCatPipe implements PipeTransform {
  private readonly schema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    age: Joi.number().required(),
    breed: Joi.string().required(),
  });

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value);
    if (error) {
      throw new BadRequestException(`Validation failed: ${error.message}`);
    }
    return value;
  }
}
```

**main.ts (Global Pipe):**

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidateCatPipe } from './cats/pipes/validate-cat.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidateCatPipe());
  await app.listen(3000);
}
bootstrap();
```

**cats.controller.ts (Controller-level Pipe):**

```typescript
import { Controller, Get, Post, Body, Param, Put, Delete, UsePipes } from '@nestjs/common';
import { CatsService, Cat } from './cats.service';
import { ValidateCatPipe } from './pipes/validate-cat.pipe';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @UsePipes(ValidateCatPipe)
  create(@Body() createCatDto: Cat) {
    try {
      this.catsService.create(createCatDto);
      return {
        message: 'Cat created successfully',
        success: true,
        data: createCatDto,
      };
    } catch (error) {
      return {
        message: 'Failed to create cat',
        success: false,
        data: error.message,
      };
    }
  }

  // Metode lainnya tetap sama
}
```

Dengan penjelasan ini, Anda sekarang memiliki pemahaman yang lebih mendalam tentang bagaimana pipes bekerja di NestJS dan bagaimana menggunakannya untuk menambahkan fitur validasi dan transformasi ke aplikasi Anda.

### 5. Filters

Exception Filters di NestJS digunakan untuk menangani dan memodifikasi respons yang dihasilkan ketika sebuah pengecualian (exception) dilempar dalam aplikasi. Filters memungkinkan Anda untuk menangani kesalahan secara terpusat dan memberikan respons yang lebih terstruktur kepada klien.

#### Kapan Menggunakan Filter:
- **Global Error Handling**: Gunakan filter untuk menangani semua kesalahan yang terjadi di aplikasi Anda secara global.
- **Specific Error Handling**: Gunakan filter untuk menangani jenis kesalahan tertentu dengan cara khusus.
- **Response Transformation**: Gunakan filter untuk memastikan bahwa semua respons memiliki format yang konsisten.
- **Logging**: Gunakan filter untuk mencatat informasi kesalahan atau debug.

#### Langkah-langkah Menggunakan Filters di NestJS

1. **Membuat Filter Kustom**
2. **Mendaftarkan Filter**
3. **Menggunakan Filter dalam Controller atau Global**

#### 5.1. Membuat Filter Kustom

Langkah pertama adalah membuat filter baru. Misalkan kita ingin membuat filter yang menangani semua jenis pengecualian dan memberikan respons yang terstruktur.

**Langkah-langkah:**

1. Buat direktori `filters` di dalam direktori `cats`.

2. Buat file `http-exception.filter.ts` di dalam direktori `filters`.

3. Tambahkan kode berikut ke `http-exception.filter.ts`:

```typescript
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const exceptionResponse: any = exception.getResponse();
    const { message, error } = exceptionResponse;

    response.status(status).json({
      success: false,
      timestamp: new Date().toISOString(),
      path: request.url,
      error,
      message,
    });
  }
}
```

Penjelasan:
- `@Catch(HttpException)` mendekorasi kelas untuk menangkap semua `HttpException`.
- `catch` adalah metode yang menangani pengecualian dan mengembalikan respons yang terstruktur.

#### 5.2. Mendaftarkan Filter

Filter dapat didaftarkan secara global, dalam modul, atau untuk metode tertentu dalam controller.

#### a. Mendaftarkan Filter secara Global

1. Buka `main.ts`.

2. Modifikasi kode untuk mendaftarkan filter secara global:

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './cats/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
```

Penjelasan:
- `useGlobalFilters` digunakan untuk mendaftarkan filter secara global sehingga akan diterapkan pada semua rute di aplikasi.

#### b. Menggunakan Filter dalam Controller atau Metode

1. Buka `cats.controller.ts`.

2. Tambahkan kode untuk menggunakan filter di controller atau metode tertentu:

```typescript
import { Controller, Get, Post, Body, Param, Put, Delete, UseFilters } from '@nestjs/common';
import { CatsService, Cat } from './cats.service';
import { HttpExceptionFilter } from './filters/http-exception.filter';

@Controller('cats')
@UseFilters(HttpExceptionFilter) // Menerapkan filter pada seluruh controller
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(@Body() createCatDto: Cat) {
    this.catsService.create(createCatDto);
    return {
      message: 'Cat created successfully',
      success: true,
      data: createCatDto,
    };
  }

  @Get()
  findAll() {
    const cats = this.catsService.findAll();
    return {
      message: 'Cats retrieved successfully',
      success: true,
      data: cats,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    const cat = this.catsService.findOne(id);
    if (!cat) {
      throw new HttpException('Cat not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Cat retrieved successfully',
      success: true,
      data: cat,
    };
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateCatDto: Partial<Cat>) {
    const cat = this.catsService.findOne(id);
    if (!cat) {
      throw new HttpException('Cat not found', HttpStatus.NOT_FOUND);
    }
    this.catsService.update(id, updateCatDto);
    return {
      message: 'Cat updated successfully',
      success: true,
      data: this.catsService.findOne(id),
    };
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    const cat = this.catsService.findOne(id);
    if (!cat) {
      throw new HttpException('Cat not found', HttpStatus.NOT_FOUND);
    }
    this.catsService.remove(id);
    return {
      message: 'Cat removed successfully',
      success: true,
      data: cat,
    };
  }
}
```

Penjelasan:
- `@UseFilters` digunakan untuk menerapkan filter pada controller atau metode tertentu.

#### 5.3. Menguji Filter

Untuk memastikan filter berfungsi dengan baik, kita bisa menggunakan Postman atau Thunder Client untuk mengirim permintaan ke server kita.

**Langkah-langkah:**

1. Jalankan aplikasi NestJS Anda:
   ```bash
   npm run start
   ```

2. Buka Postman atau Thunder Client.

3. Kirim permintaan GET ke `http://localhost:3000/cats/999` (ID yang tidak ada).

4. Anda akan mendapatkan respons dengan status 404 Not Found:

```json
{
  "success": false,
  "timestamp": "2024-07-02T12:34:56.789Z",
  "path": "/cats/999",
  "error": "Not Found",
  "message": "Cat not found"
}
```

Penjelasan:
- Filter menangkap pengecualian `HttpException` dan mengembalikan respons yang terstruktur.

#### Contoh Kode Lengkap

**http-exception.filter.ts:**

```typescript
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const exceptionResponse: any = exception.getResponse();
    const { message, error } = exceptionResponse;

    response.status(status).json({
      success: false,
      timestamp: new Date().toISOString(),
      path: request.url,
      error,
      message,
    });
  }
}
```

**main.ts (Global Filter):**

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './cats/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
```

**cats.controller.ts (Controller-level Filter):**

```typescript
import { Controller, Get, Post, Body, Param, Put, Delete, UseFilters } from '@nestjs/common';
import { CatsService, Cat } from './cats.service';
import { HttpExceptionFilter } from './filters/http-exception.filter';

@Controller('cats')
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(@Body() createCatDto: Cat) {
    this.catsService.create(createCatDto);
    return {
      message: 'Cat created successfully',
      success: true,
      data: createCatDto,
    };
  }

  @Get()
  findAll() {
    const cats = this.catsService.findAll();
    return {
      message: 'Cats retrieved successfully',
      success: true,
      data: cats,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    const cat = this.catsService.findOne(id);
    if (!cat) {
      throw new HttpException('Cat not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Cat retrieved successfully',
      success: true,
      data: cat,
    };
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateCatDto: Partial<Cat>) {
    const cat = this.catsService.findOne(id);
    if (!cat) {
      throw new HttpException('Cat not found', HttpStatus.NOT_FOUND);
    }
    this.catsService.update(id, updateCatDto);
    return {
      message: 'Cat updated successfully',
      success: true,
      data: this.catsService.findOne(id),
    };
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    const cat = this.catsService.findOne(id);
    if (!cat) {
      throw new HttpException('Cat not found', HttpStatus.NOT_FOUND);
    }
    this.catsService.remove(id);
    return {
      message: 'Cat removed successfully',
      success: true,
      data: cat,
    };
  }
}
```

Dengan penjelasan ini, Anda sekarang memiliki pemahaman yang lebih mendalam tentang bagaimana filters bekerja di NestJS dan bagaimana menggunakannya untuk menangani pengecualian dan memberikan respons yang lebih terstruktur dalam aplikasi Anda.
 

Dengan mempelajari konsep-konsep intermediate ini, Anda akan lebih siap untuk mengembangkan aplikasi NestJS yang lebih kompleks dan dapat menangani berbagai kebutuhan bisnis. Setiap topik di atas adalah fondasi penting dalam pengembangan aplikasi dengan NestJS, dan menguasai mereka akan membuat Anda lebih produktif dan efektif dalam pengembangan aplikasi Anda.

---
Next
---
Berikut adalah struktur direktori proyek untuk aplikasi NestJS yang telah kita bahas dalam materi sebelumnya, termasuk penggunaan middleware, interceptors, guards, pipes, filters, dan integrasi database dengan TypeORM:

```
nestjs-project
├── src
│   ├── cats
│   │   ├── dto
│   │   │   ├── create-cat.dto.ts
│   │   ├── entities
│   │   │   ├── cat.entity.ts
│   │   ├── middleware
│   │   │   ├── logger.middleware.ts
│   │   ├── interceptors
│   │   │   ├── logging.interceptor.ts
│   │   ├── guards
│   │   │   ├── roles.guard.ts
│   │   ├── pipes
│   │   │   ├── validation.pipe.ts
│   │   ├── filters
│   │   │   ├── http-exception.filter.ts
│   │   ├── cats.controller.ts
│   │   ├── cats.service.ts
│   │   ├── cats.module.ts
│   ├── app.module.ts
│   ├── main.ts
├── test
│   ├── app.e2e-spec.ts
│   ├── jest-e2e.json
├── .eslintrc.js
├── .prettierrc
├── nest-cli.json
├── package.json
├── tsconfig.build.json
├── tsconfig.json
```

### Penjelasan Struktur Direktori:

1. **src/**: Folder utama untuk kode sumber aplikasi.
    - **cats/**: Folder untuk semua yang berhubungan dengan modul `cats`.
        - **dto/**: Folder untuk Data Transfer Objects.
            - `create-cat.dto.ts`: DTO untuk membuat cat.
        - **entities/**: Folder untuk entitas database.
            - `cat.entity.ts`: Definisi entitas `Cat` untuk TypeORM.
        - **middleware/**: Folder untuk middleware.
            - `logger.middleware.ts`: Middleware untuk logging request.
        - **interceptors/**: Folder untuk interceptors.
            - `logging.interceptor.ts`: Interceptor untuk logging waktu request.
        - **guards/**: Folder untuk guards.
            - `roles.guard.ts`: Guard untuk peran pengguna.
        - **pipes/**: Folder untuk pipes.
            - `validation.pipe.ts`: Pipe untuk validasi menggunakan Joi.
        - **filters/**: Folder untuk filters.
            - `http-exception.filter.ts`: Filter untuk menangani HTTP exceptions.
        - `cats.controller.ts`: Controller untuk modul `cats`.
        - `cats.service.ts`: Service untuk modul `cats`.
        - `cats.module.ts`: Modul untuk mengorganisir komponen `cats`.
    - `app.module.ts`: Modul root untuk aplikasi NestJS.
    - `main.ts`: Titik masuk aplikasi, di mana aplikasi NestJS di-boostrap.

2. **test/**: Folder untuk pengujian aplikasi.
    - `app.e2e-spec.ts`: Pengujian end-to-end untuk aplikasi.
    - `jest-e2e.json`: Konfigurasi Jest untuk pengujian end-to-end.

3. **.eslintrc.js**: Konfigurasi ESLint untuk memastikan konsistensi kode.
4. **.prettierrc**: Konfigurasi Prettier untuk memastikan konsistensi format kode.
5. **nest-cli.json**: Konfigurasi CLI NestJS.
6. **package.json**: Daftar dependensi dan skrip npm.
7. **tsconfig.build.json**: Konfigurasi TypeScript untuk proses build.
8. **tsconfig.json**: Konfigurasi TypeScript untuk proyek.

### Langkah-Langkah Praktis

1. **Setup Project:**

   ```bash
   nest new nestjs-project
   cd nestjs-project
   npm install @nestjs/typeorm typeorm mysql2 @hapi/joi
   ```

2. **Buat Struktur Direktori:**

   Buat direktori `cats` beserta sub-direktori seperti yang dijelaskan di atas.

3. **Tambahkan File-File yang Diperlukan:**

   Tambahkan file `create-cat.dto.ts`, `cat.entity.ts`, `logger.middleware.ts`, `logging.interceptor.ts`, `roles.guard.ts`, `validation.pipe.ts`, dan `http-exception.filter.ts` dengan isi yang sesuai.

4. **Modifikasi `cats.module.ts`:**

   ```typescript
   import { Module } from '@nestjs/common';
   import { TypeOrmModule } from '@nestjs/typeorm';
   import { CatsController } from './cats.controller';
   import { CatsService } from './cats.service';
   import { Cat } from './entities/cat.entity';

   @Module({
     imports: [TypeOrmModule.forFeature([Cat])],
     controllers: [CatsController],
     providers: [CatsService],
   })
   export class CatsModule {}
   ```

5. **Modifikasi `app.module.ts`:**

   ```typescript
   import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
   import { TypeOrmModule } from '@nestjs/typeorm';
   import { CatsModule } from './cats/cats.module';
   import { LoggerMiddleware } from './cats/middleware/logger.middleware';

   @Module({
     imports: [
       TypeOrmModule.forRoot({
         type: 'mysql',
         host: 'localhost',
         port: 3306,
         username: 'root',
         password: 'password',
         database: 'test',
         entities: [__dirname + '/**/*.entity{.ts,.js}'],
         synchronize: true,
       }),
       CatsModule,
     ],
   })
   export class AppModule implements NestModule {
     configure(consumer: MiddlewareConsumer) {
       consumer
         .apply(LoggerMiddleware)
         .forRoutes('*');
     }
   }
   ```

6. **Modifikasi `main.ts`:**

   ```typescript
   import { NestFactory } from '@nestjs/core';
   import { AppModule } from './app.module';

   async function bootstrap() {
     const app = await NestFactory.create(AppModule);
     await app.listen(3000);
   }
   bootstrap();
   ```

Dengan struktur direktori dan penjelasan ini, Anda dapat melanjutkan pengembangan aplikasi NestJS dengan lebih terorganisir dan mengikuti praktik terbaik dalam pengembangan aplikasi berbasis NestJS.


---
extra

---

Di NestJS, middleware dan interceptor memiliki tujuan dan kegunaan yang berbeda. Memahami kapan menggunakan masing-masing bisa membantu Anda membangun aplikasi yang lebih terstruktur dan terorganisir. Berikut penjelasan kapan sebaiknya menggunakan middleware dan kapan menggunakan interceptor:

### Middleware

Middleware adalah fungsi yang dijalankan sebelum rute penanganan permintaan. Middleware biasanya digunakan untuk tugas-tugas yang tidak spesifik terhadap rute atau logika aplikasi yang lebih umum dan global. Berikut adalah beberapa contoh kapan sebaiknya menggunakan middleware:

1. **Autentikasi**: Middleware sering digunakan untuk memeriksa token autentikasi dan memverifikasi pengguna sebelum permintaan diteruskan ke rute penanganan.
2. **Logging**: Middleware dapat digunakan untuk mencatat informasi tentang setiap permintaan yang masuk, seperti URL, metode HTTP, dan waktu.
3. **Body Parsing**: Middleware digunakan untuk mem-parsing body dari permintaan, seperti JSON atau URL-encoded data.
4. **Pengaturan Header**: Middleware dapat digunakan untuk menambahkan atau memodifikasi header dalam permintaan atau tanggapan.
5. **CORS**: Middleware sering digunakan untuk menangani Cross-Origin Resource Sharing (CORS).

Contoh penggunaan middleware:

```typescript
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`Request...`);
    next();
  }
}

// Di dalam AppModule atau modul lain
import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';

@Module({})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
```

### Interceptor

Interceptors adalah kelas yang mengimplementasikan antarmuka `NestInterceptor`. Interceptors digunakan untuk mengintervensi alur eksekusi sebelum atau sesudah rute penanganan permintaan. Mereka sering digunakan untuk transformasi dan manipulasi data. Berikut adalah beberapa contoh kapan sebaiknya menggunakan interceptor:

1. **Transformasi Data**: Interceptor dapat digunakan untuk mengubah atau memodifikasi data sebelum mengirim tanggapan ke klien.
2. **Logging**: Interceptor dapat mencatat durasi eksekusi suatu operasi atau mencatat hasil sebelum mengirim tanggapan.
3. **Caching**: Interceptor dapat digunakan untuk mengimplementasikan caching data untuk mempercepat respons.
4. **Handling Errors**: Interceptor dapat menangkap dan mengubah kesalahan yang terjadi selama eksekusi menjadi tanggapan yang lebih bermakna atau user-friendly.
5. **Timeouts**: Interceptor dapat digunakan untuk mengatur batas waktu eksekusi suatu operasi dan menangani situasi di mana operasi tersebut memakan waktu terlalu lama.

Contoh penggunaan interceptor:

```typescript
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map(data => ({ data })));
  }
}

// Di dalam controller
import { Controller, Get, UseInterceptors } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get()
  @UseInterceptors(TransformInterceptor)
  findAll() {
    return [];
  }
}
```

### Perbandingan

- **Middleware**:
  - Dijalankan sebelum rute penanganan.
  - Digunakan untuk tugas-tugas umum seperti autentikasi, logging, body parsing, pengaturan header, dan CORS.
  - Lebih global dan tidak terikat pada rute spesifik.

- **Interceptor**:
  - Dijalankan sebelum atau sesudah rute penanganan.
  - Digunakan untuk transformasi data, logging, caching, handling errors, dan timeouts.
  - Lebih fleksibel dan bisa diterapkan pada rute atau metode tertentu dengan mudah.

Dengan memahami perbedaan dan kegunaan masing-masing, Anda dapat memilih alat yang tepat untuk kebutuhan spesifik aplikasi Anda.
