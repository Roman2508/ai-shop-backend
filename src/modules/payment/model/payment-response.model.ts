import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaymentModel {
  @Field(() => String)
  checkout_url: string;

  @Field(() => String)
  payment_id: string;

  @Field(() => String)
  response_status: string;
}

@ObjectType()
export class PaymentResponseModel {
  @Field(() => PaymentModel)
  response: PaymentModel;
}
