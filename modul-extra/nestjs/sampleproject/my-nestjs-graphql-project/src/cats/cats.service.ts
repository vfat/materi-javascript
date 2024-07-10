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