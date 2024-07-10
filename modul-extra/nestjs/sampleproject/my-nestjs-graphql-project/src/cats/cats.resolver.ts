import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CatsService } from './cats.service';
import { Cat } from './entities/cat.entity';

@Resolver(() => Cat)
export class CatsResolver {
  constructor(private readonly catsService: CatsService) {}

  @Mutation(() => Cat)
  createCat(@Args('id', { type: () => Int }) id: number, @Args('name') name: string, @Args('age', { type: () => Int }) age: number, @Args('breed') breed: string): Cat {
    const cat = new Cat();
    cat.id = id;
    cat.name = name;
    cat.age = age;
    cat.breed = breed;
    return this.catsService.create(cat);
  }

  @Query(() => [Cat], { name: 'cats' })
  findAll(): Cat[] {
    return this.catsService.findAll();
  }

  @Query(() => Cat, { name: 'cat' })
  findOne(@Args('id', { type: () => Int }) id: number): Cat {
    return this.catsService.findOne(id);
  }

  @Mutation(() => Cat)
  updateCat(@Args('id', { type: () => Int }) id: number, @Args('name') name: string, @Args('age', { type: () => Int }) age: number, @Args('breed') breed: string): Cat {
    return this.catsService.update(id, { name, age, breed });
  }

  @Mutation(() => Boolean)
  removeCat(@Args('id', { type: () => Int }) id: number): boolean {
    this.catsService.remove(id);
    return true;
  }
}