import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ReviewModel } from 'src/modules/review/models/review.model';

@ObjectType()
export class ProductModel {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => Number)
  price: number;

  @Field(() => String)
  brand: string;

  @Field(() => [String])
  images: string[];

  @Field(() => Number)
  ram: number;

  @Field(() => Number)
  builtInMemory: number;

  @Field(() => String)
  color: string;

  @Field(() => Number)
  frontCamera: number;

  @Field(() => Number)
  mainCamera: number;

  @Field(() => Number)
  screenDiagonal: number;

  @Field(() => Number)
  simCount: number;

  @Field(() => [String])
  simFormat: string[];

  @Field(() => String)
  os: string;

  @Field(() => String)
  processorName: string;

  @Field(() => String)
  processorCores: string;

  @Field(() => Number)
  battery: number;

  @Field(() => String)
  materials: string;

  @Field(() => String)
  deliverySet: string;

  @Field(() => [ReviewModel])
  reviews: ReviewModel[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
