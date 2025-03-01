import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

@InputType()
export class ChangeEmailInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
