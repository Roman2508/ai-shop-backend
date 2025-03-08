import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class PaginateAndFilterInput {
  @Field(() => Int, { defaultValue: 0, nullable: true })
  skip: number;

  @Field(() => Int, { defaultValue: 24, nullable: true })
  limit: number;

  @Field(() => String, { nullable: true })
  sortBy: string;

  //
  @Field(() => Int, { nullable: true })
  priceFrom: number;

  @Field(() => Int, { nullable: true })
  priceTo: number;

  @Field(() => String, { nullable: true })
  brand: string;

  //
  @Field(() => String, { nullable: true })
  ram: string;

  @Field(() => String, { nullable: true })
  builtInMemory: string;

  @Field(() => String, { nullable: true })
  color: string;

  @Field(() => String, { nullable: true })
  frontCamera: string;

  @Field(() => String, { nullable: true })
  mainCamera: string;

  @Field(() => String, { nullable: true })
  screenDiagonal: string;

  @Field(() => String, { nullable: true })
  simCount: string;

  @Field(() => String, { nullable: true })
  simFormat: string;

  @Field(() => String, { nullable: true })
  os: string;

  @Field(() => String, { nullable: true })
  processorName: string;

  @Field(() => String, { nullable: true })
  processorCores: string;

  @Field(() => String, { nullable: true })
  battery: string;

  @Field(() => String, { nullable: true })
  materials: string;

  @Field(() => String, { nullable: true })
  deliverySet: string;
}
