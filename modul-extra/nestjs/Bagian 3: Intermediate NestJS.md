### Bagian 3: Intermediate NestJS

Setelah memahami dasar-dasar NestJS, kita akan melanjutkan ke konsep-konsep yang lebih mendalam dan fleksibel dalam pembangunan aplikasi. Bagian ini mencakup Middleware, Guards, Interceptors, Filters, dan Pipes.

#### 1. Middleware
Middleware adalah fungsi yang dieksekusi sebelum handler route. Middleware dapat digunakan untuk berbagai keperluan seperti logging, validasi token, dan autentikasi.

**Membuat dan Menggunakan Middleware:**
Contoh middleware untuk logging:

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

**Mendaftarkan Middleware:**

```typescript
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './logger.middleware';
import { CatsController } from './cats.controller';

@Module({
  controllers: [CatsController],
})
export class CatsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(CatsController);
  }
}
```

Penjelasan:
- **configure**: Method yang digunakan untuk mendaftarkan middleware.
- **consumer.apply(LoggerMiddleware).forRoutes(CatsController)**: Menentukan middleware yang digunakan dan pada route mana middleware diterapkan.

#### 2. Guards
Guards adalah fungsi yang menentukan apakah suatu route tertentu dapat diakses atau tidak. Guards biasa digunakan untuk otorisasi.

**Membuat dan Menggunakan Guards:**
Contoh guard untuk otorisasi:

```typescript
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return user && user.isAdmin;
  }
}
```

**Menggunakan Guard dalam Controller:**

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

@Controller('cats')
export class CatsController {
  @Get()
  @UseGuards(AuthGuard)
  findAll(): string {
    return 'This action returns all cats';
  }
}
```

Penjelasan:
- **@UseGuards(AuthGuard)**: Mendekorasi route untuk menggunakan guard.

#### 3. Interceptors
Interceptors adalah kelas yang memungkinkan Anda untuk meng-intercept request dan response. Ini bisa digunakan untuk modifikasi, logging, atau caching.

**Membuat dan Menggunakan Interceptor:**
Contoh interceptor untuk logging:

```typescript
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');
    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
  }
}
```

**Menggunakan Interceptor dalam Controller:**

```typescript
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { LoggingInterceptor } from './logging.interceptor';

@Controller('cats')
@UseInterceptors(LoggingInterceptor)
export class CatsController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}
```

Penjelasan:
- **@UseInterceptors(LoggingInterceptor)**: Mendekorasi controller atau metode untuk menggunakan interceptor.

#### 4. Filters
Filters adalah kelas yang digunakan untuk menangani exception. Filters memungkinkan penanganan error global atau spesifik untuk route tertentu.

**Membuat dan Menggunakan Filter:**
Contoh filter untuk penanganan error:

```typescript
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}
```

**Menggunakan Filter dalam Controller:**

```typescript
import { Controller, Get, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception.filter';

@Controller('cats')
@UseFilters(HttpExceptionFilter)
export class CatsController {
  @Get()
  findAll(): string {
    throw new HttpException('Forbidden', 403);
  }
}
```

Penjelasan:
- **@UseFilters(HttpExceptionFilter)**: Mendekorasi controller atau metode untuk menggunakan filter.

#### 5. Pipes
Pipes adalah fungsi yang digunakan untuk transformasi dan validasi data yang masuk. Pipes bisa digunakan untuk memanipulasi data request sebelum mencapai controller.

**Membuat dan Menggunakan Pipe:**
Contoh pipe untuk validasi:

```typescript
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('Validation failed');
    }
    return val;
  }
}
```

**Menggunakan Pipe dalam Controller:**

```typescript
import { Controller, Get, Param } from '@nestjs/common';
import { ParseIntPipe } from './parse-int.pipe';

@Controller('cats')
export class CatsController {
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): string {
    return `This action returns a cat with id ${id}`;
  }
}
```

Penjelasan:
- **@Param('id', ParseIntPipe)**: Mendekorasi parameter route untuk menggunakan pipe.

---

Dengan mempelajari konsep-konsep intermediate ini, Anda akan lebih mampu untuk membangun aplikasi yang lebih kompleks dan dapat di-maintain dengan baik menggunakan NestJS. Pada bagian selanjutnya, kita akan membahas fitur-fitur lanjutan seperti Database Integration, GraphQL, Microservices, Testing, dan Performance Optimization.
