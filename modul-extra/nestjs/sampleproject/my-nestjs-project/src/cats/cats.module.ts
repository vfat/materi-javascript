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
  ]
})
export class CatsModule {}
