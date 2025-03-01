import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { EnumOrderStatus } from 'prisma/generated';

export class CreateOrderInput {
  @IsOptional()
  @IsEnum(EnumOrderStatus, { message: 'Статус замовлення оновлено' })
  status: EnumOrderStatus;

  @IsArray({ message: 'В замовленні немає ні одного товара' })
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}

export class OrderItemDto {
  @IsNumber({}, { message: 'Кількість повинна бути числом' })
  quantity: number;

  @IsNumber({}, { message: 'Ціна повинна бути числом' })
  price: number;

  @IsString()
  productId: string;
}
