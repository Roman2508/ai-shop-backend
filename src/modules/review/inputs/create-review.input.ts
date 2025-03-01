import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class CreateReviewInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  productId: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  text: string;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  rating: number;
}
