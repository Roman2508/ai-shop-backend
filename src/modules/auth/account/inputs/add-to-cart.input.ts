import { Field, InputType } from '@nestjs/graphql';

import { IsString, IsNumber } from 'class-validator';

@InputType()
export class AddToCartInput {
  @Field()
  @IsString()
  productId: string;

  @Field()
  @IsNumber()
  count: number;
}
