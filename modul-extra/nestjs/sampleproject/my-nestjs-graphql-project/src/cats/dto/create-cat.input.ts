import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateCatInput {
  @Field()
  name: string;

  @Field(() => Int)
  age: number;

  @Field()
  breed: string;
}
