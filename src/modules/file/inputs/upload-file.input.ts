import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UploadFileInput {
  @Field()
  file: any;
}
