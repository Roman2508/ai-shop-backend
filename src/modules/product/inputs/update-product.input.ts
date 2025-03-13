import { IsString, IsNotEmpty } from 'class-validator';
import { Field, InputType, PartialType } from '@nestjs/graphql';

import { CreateProductInput } from './create-product.input';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
  @Field()
  @IsString({ message: 'Це поле не може бути пустим' })
  @IsNotEmpty()
  productId: string;
}
