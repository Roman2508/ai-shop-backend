import { IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AddToViewedInput {
  @Field()
  @IsString()
  userId: string;

  @Field()
  @IsString()
  productId: string;
}
