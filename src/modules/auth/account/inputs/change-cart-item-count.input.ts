import { Field, InputType } from '@nestjs/graphql';

import { IsString, IsNumber } from 'class-validator';

@InputType()
export class ChangeCartItemCountInput {
  @Field()
  @IsString()
  id: string;

  @Field()
  @IsNumber()
  count: number;
}
