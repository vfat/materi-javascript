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
    return this.cats.find(cat => cat.id == id);
  }

  update(id: number, updateCatDto: Partial<Cat>) {
    const catIndex = this.cats.findIndex(cat => cat.id == id);
    if (catIndex !== -1) {
      this.cats[catIndex] = { ...this.cats[catIndex], ...updateCatDto };
    }
  }

  remove(id: number) {
    const catIndex = this.cats.findIndex(cat => cat.id == id);
    if (catIndex !== -1) {
      this.cats.splice(catIndex, 1);
    }
  }
}