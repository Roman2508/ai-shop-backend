import { Type } from 'class-transformer';
import { Field, InputType } from '@nestjs/graphql';
import { EnumOrderStatus } from 'prisma/generated';
import { IsArray, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

@InputType()
export class CreateOrderInput {
  @Field(() => String)
  @IsOptional()
  orderId: string;

  @Field(() => String)
  @IsOptional()
  userId: string;

  @Field(() => [OrderItemDto])
  @IsArray({ message: 'В замовленні немає ні одного товара' })
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}

@InputType()
export class OrderItemDto {
  @Field(() => Number)
  @IsNumber({}, { message: 'Кількість повинна бути числом' })
  quantity: number;

  @Field(() => Number)
  @IsNumber({}, { message: 'Ціна повинна бути числом' })
  price: number;

  @Field(() => String)
  @IsString()
  productId: string;
}
