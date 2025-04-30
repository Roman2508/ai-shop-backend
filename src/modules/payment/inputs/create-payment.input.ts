import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePaymentInput {
  @Field()
  name: any;

  @Field()
  duration: any;

  @Field()
  price: any;
}
