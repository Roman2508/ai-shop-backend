import { Args, Mutation, Resolver } from '@nestjs/graphql';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';

import { FileService } from './file.service';

@Resolver('File')
export class FileResolver {
  constructor(private readonly fileService: FileService) {}

  @Mutation(() => String, { name: 'uploadFile' })
  async uploadFile(@Args({ name: 'file', type: () => GraphQLUpload }) file: any) {
    return this.fileService.upload(file);
  }
}
