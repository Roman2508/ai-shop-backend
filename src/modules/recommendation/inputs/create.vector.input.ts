import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';

import { CreateProductInput } from 'src/modules/product/inputs/create-product.input';

@InputType()
export class CreateVectorInput extends CreateProductInput {
  @Field(() => String)
  @IsString({ message: 'Це поле не може бути пустим' })
  @IsNotEmpty()
  id: string;
}
