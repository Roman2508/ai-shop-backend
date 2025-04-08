import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, Matches, IsString, MinLength, IsOptional } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field()
  @IsString()
  @Matches(/^[a-zA-Z0-9_]+(?:-[a-zA-Z0-9_]+)*$/)
  username?: string;

  @Field()
  @IsString()
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MinLength(8)
  password?: string;

  @Field()
  @IsString()
  displayName?: string;

  @Field()
  @IsString()
  city?: string;

  @Field()
  @IsString()
  street?: string;

  @Field()
  @IsString()
  postOffice?: string;
}
