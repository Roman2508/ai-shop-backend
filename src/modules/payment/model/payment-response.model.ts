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

// {
//     response: {
//       checkout_url: 'https://pay.fondy.eu/merchants/5ad6b888f4becb0c33d543d54e57d86c/default/index.html?token=7509cebbc56e3ade456d856ec559fc11406dc844',
//       payment_id: '853370908',
//       response_status: 'success'
//     }
//   }
