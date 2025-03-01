import { Field, InputType } from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';

@InputType()
export class UploadFileInput {
  @Field(() => GraphQLUpload) // Обрабатываем файл через GraphQL Upload
  file: Promise<FileUpload>;
}
