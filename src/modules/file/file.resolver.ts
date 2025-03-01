import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { FileService } from './file.service';
import { UploadFileInput } from './inputs/upload-file.input';
import { Authorization } from 'src/shared/decorators/auth.decorator';
import { Authorized } from 'src/shared/decorators/authorized.decorator';
import { User } from 'prisma/generated';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import * as Upload from 'graphql-upload/Upload.js';

@Resolver('File')
export class FileResolver {
  constructor(private readonly fileService: FileService) {}

  @Authorization()
  @Mutation(() => Boolean, { name: 'changeStreamThumbnail' })
  public async changeThumbnail(
    @Authorized() user: User,
    @Args('thumbnail', { type: () => GraphQLUpload }, FileValidationPipe)
    thumbnail: Upload,
  ) {
    return this.fileService.changeThumbnail(user, thumbnail);
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'removeStreamThumbnail' })
  public async removeThumbnail(@Authorized() user: User) {
    return this.fileService.removeThumbnail(user);
  }

  // @Mutation(() => String)
  // async uploadFile(@Args('input') input: UploadFileInput): Promise<string> {
  //   return await this.fileService.saveFile(input.file);
  // }
}
