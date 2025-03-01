import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  @IsString({ message: 'Це поле не може бути пустим' })
  @IsNotEmpty()
  title: string;

  @Field(() => Number)
  @IsNumber()
  @IsNotEmpty({ message: 'Це поле не може бути пустим' })
  price: number;

  @Field(() => [String])
  @IsString({ message: 'Вкажіть хоча б одне фото', each: true })
  @IsNotEmpty({ message: 'Це поле не може бути пустим' })
  images: string[];

  @Field(() => Number)
  @IsNumber()
  @IsNotEmpty({ message: 'Це поле не може бути пустим' })
  ram: number;

  @Field(() => Number)
  @IsNumber()
  @IsNotEmpty({ message: 'Це поле не може бути пустим' })
  builtInMemory: number;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Це поле не може бути пустим' })
  color: string;

  @Field(() => Number)
  @IsNumber()
  @IsNotEmpty({ message: 'Це поле не може бути пустим' })
  frontCamera: number;

  @Field(() => Number)
  @IsNumber()
  @IsNotEmpty({ message: 'Це поле не може бути пустим' })
  mainCamera: number;

  @Field(() => Number)
  @IsNumber()
  @IsNotEmpty({ message: 'Це поле не може бути пустим' })
  screenDiagonal: number;

  @Field(() => Number)
  @IsNumber()
  @IsNotEmpty({ message: 'Це поле не може бути пустим' })
  simCount: number;

  @Field(() => [String])
  @IsString({ message: 'Вкажіть хоча б один формат' })
  @IsNotEmpty({ message: 'Це поле не може бути пустим', each: true })
  simFormat: string[];

  @Field(() => String)
  @IsNumber()
  @IsNotEmpty({ message: 'Це поле не може бути пустим' })
  os: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Це поле не може бути пустим' })
  processorName: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Це поле не може бути пустим' })
  processorCores: string;

  @Field(() => Number)
  @IsNumber()
  @IsNotEmpty({ message: 'Це поле не може бути пустим' })
  battery: number;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Це поле не може бути пустим' })
  materials: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Це поле не може бути пустим' })
  deliverySet: string;
}
