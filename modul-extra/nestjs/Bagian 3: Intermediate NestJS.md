## Bagian 3: Intermediate NestJS

Pada bagian ini, kita akan mendalami konsep-konsep lebih lanjut yang akan membantu Anda mengembangkan aplikasi NestJS yang lebih kompleks dan efisien. Berikut adalah beberapa topik yang akan kita bahas:

1. **Middleware**
2. **Interceptors**
3. **Guards**
4. **Pipes**
5. **Filters**
6. **Database dengan TypeORM**

### 1. Middleware

Middleware adalah fungsi yang dieksekusi sebelum request mencapai controller. Middleware dapat digunakan untuk memodifikasi request dan response objects, mengakhiri siklus request-response, atau memanggil middleware berikutnya dalam stack.

**Contoh Middleware:**

1. **Buat Middleware:**

    Buat file baru `logger.middleware.ts`:

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
    ```

2. **Gunakan Middleware dalam Modul:**

    Modifikasi file `app.module.ts`:

    ```typescript
    import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
    import { LoggerMiddleware } from './logger.middleware';
    import { CatsModule } from './cats/cats.module';

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

### 2. Interceptors

Interceptors memungkinkan kita untuk mengintersep request atau response dan menambahkan logika kustom. Interceptors bisa digunakan untuk logging, transforming responses, caching, dan sebagainya.

**Contoh Interceptor:**

1. **Buat Interceptor:**

    Buat file baru `logging.interceptor.ts`:

    ```typescript
    import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
    import { Observable } from 'rxjs';
    import { tap } from 'rxjs/operators';

    @Injectable()
    export class LoggingInterceptor implements NestInterceptor {
      intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        console.log('Before...');

        const now = Date.now();
        return next
          .handle()
          .pipe(
            tap(() => console.log(`After... ${Date.now() - now}ms`)),
          );
      }
    }
    ```

2. **Gunakan Interceptor dalam Controller:**

    Modifikasi file `cats.controller.ts`:

    ```typescript
    import { Controller, Get, Post, Body, Param, Put, Delete, UseInterceptors } from '@nestjs/common';
    import { CatsService, Cat } from './cats.service';
    import { LoggingInterceptor } from './logging.interceptor';

    @UseInterceptors(LoggingInterceptor)
    @Controller('cats')
    export class CatsController {
      // ... kode sebelumnya
    }
    ```

### 3. Guards

Guards digunakan untuk menentukan apakah request tertentu boleh dijalankan atau tidak, biasanya digunakan untuk keperluan otentikasi dan otorisasi.

**Contoh Guard:**

1. **Buat Guard:**

    Buat file baru `roles.guard.ts`:

    ```typescript
    import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
    import { Reflector } from '@nestjs/core';

    @Injectable()
    export class RolesGuard implements CanActivate {
      constructor(private reflector: Reflector) {}

      canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
          return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        return roles.includes(user.role);
      }
    }
    ```

2. **Gunakan Guard dalam Controller:**

    Modifikasi file `cats.controller.ts`:

    ```typescript
    import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
    import { CatsService, Cat } from './cats.service';
    import { RolesGuard } from './roles.guard';

    @UseGuards(RolesGuard)
    @Controller('cats')
    export class CatsController {
      // ... kode sebelumnya
    }
    ```

### 4. Pipes

Pipes digunakan untuk transformasi dan validasi data. Pipes dapat diimplementasikan sebagai class yang mengimplementasikan `PipeTransform` interface.

**Contoh Pipe:**

1. **Buat Pipe:**

    Buat file baru `validation.pipe.ts`:

    ```typescript
    import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
    import { ObjectSchema } from '@hapi/joi';

    @Injectable()
    export class ValidationPipe implements PipeTransform {
      constructor(private schema: ObjectSchema) {}

      transform(value: any, metadata: ArgumentMetadata) {
        const { error } = this.schema.validate(value);
        if (error) {
          throw new BadRequestException('Validation failed');
        }
        return value;
      }
    }
    ```

2. **Gunakan Pipe dalam Controller:**

    Modifikasi file `cats.controller.ts`:

    ```typescript
    import { Controller, Get, Post, Body, Param, Put, Delete, UsePipes } from '@nestjs/common';
    import { CatsService, Cat } from './cats.service';
    import { ValidationPipe } from './validation.pipe';
    import { createCatSchema } from './create-cat.dto';

    @Controller('cats')
    export class CatsController {
      // ... kode sebelumnya

      @Post()
      @UsePipes(new ValidationPipe(createCatSchema))
      create(@Body() createCatDto: Cat) {
        // ... kode sebelumnya
      }
    }
    ```

### 5. Filters

Filters digunakan untuk menangani exception secara global atau per-controller. Dengan filter, kita bisa menangani berbagai jenis error dan mengembalikan response yang sesuai.

**Contoh Filter:**

1. **Buat Filter:**

    Buat file baru `http-exception.filter.ts`:

    ```typescript
    import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';

    @Catch()
    export class HttpExceptionFilter implements ExceptionFilter {
      catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;

        response.status(status).json({
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url,
          message: (exception as any).message || null,
        });
      }
    }
    ```

2. **Gunakan Filter dalam Controller:**

    Modifikasi file `cats.controller.ts`:

    ```typescript
    import { Controller, Get, Post, Body, Param, Put, Delete, UseFilters } from '@nestjs/common';
    import { CatsService, Cat } from './cats.service';
    import { HttpExceptionFilter } from './http-exception.filter';

    @UseFilters(HttpExceptionFilter)
    @Controller('cats')
    export class CatsController {
      // ... kode sebelumnya
    }
    ```

### 6. Database dengan TypeORM

TypeORM adalah ORM yang bekerja sangat baik dengan NestJS untuk mengelola koneksi ke database dan operasi CRUD.

1. **Instalasi Paket yang Diperlukan:**

    ```bash
    npm install @nestjs/typeorm typeorm mysql2
    ```

2. **Konfigurasi TypeORM:**

    Modifikasi file `app.module.ts`:

    ```typescript
    import { Module } from '@nestjs/common';
    import { TypeOrmModule } from '@nestjs/typeorm';
    import { CatsModule } from './cats/cats.module';
    import { Cat } from './cats/cat.entity';

    @Module({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'password',
          database: 'test',
          entities: [Cat],
          synchronize: true,
        }),
        CatsModule,
      ],
    })
    export class AppModule {}
    ```

3. **Buat Entity:**

    Buat file baru `cat.entity.ts` di dalam folder `cats`:

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

4. **Gunakan Repository dalam Service:**

    Modifikasi file `cats.service.ts`:

    ```typescript
    import { Injectable } from '@nestjs/common';
    import { InjectRepository } from '@nestjs/typeorm';
    import { Repository } from 'typeorm';
    import { Cat } from './cat.entity';

    @Injectable()
    export class CatsService {
      constructor(
        @InjectRepository(Cat)
        private readonly catRepository: Repository<Cat>,
      ) {}

      async create(cat: Cat): Promise<Cat> {
        return this.catRepository.save(cat);
      }

      async findAll(): Promise<Cat[]> {
        return this.catRepository.find();
      }

      async find

One(id: number): Promise<Cat> {
        return this.catRepository.findOneBy({ id });
      }

      async update(id: number, updateCatDto: Partial<Cat>): Promise<void> {
        await this.catRepository.update(id, updateCatDto);
      }

      async remove(id: number): Promise<void> {
        await this.catRepository.delete(id);
      }
    }
    ```

5. **Modifikasi Controller untuk Menggunakan Service yang Baru:**

    ```typescript
    import { Controller, Get, Post, Body, Param, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
    import { CatsService, Cat } from './cats.service';

    @Controller('cats')
    export class CatsController {
      constructor(private readonly catsService: CatsService) {}

      @Post()
      async create(@Body() createCatDto: Cat) {
        try {
          const newCat = await this.catsService.create(createCatDto);
          return {
            message: 'Cat created successfully',
            success: true,
            data: newCat,
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
      async update(@Param('id') id: number, @Body() updateCatDto: Partial<Cat>) {
        try {
          const cat = await this.catsService.findOne(id);
          if (!cat) {
            throw new HttpException('Cat not found', HttpStatus.NOT_FOUND);
          }
          await this.catsService.update(id, updateCatDto);
          return {
            message: 'Cat updated successfully',
            success: true,
            data: await this.catsService.findOne(id),
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
