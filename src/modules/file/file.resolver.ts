import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import { FileService } from './file.service';
import { UploadFileInput } from './inputs/upload-file.input';
import { Authorization } from 'src/shared/decorators/auth.decorator';
import { Authorized } from 'src/shared/decorators/authorized.decorator';
import { User } from 'prisma/generated';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import * as Upload from 'graphql-upload/Upload.js';
import { FileValidationPipe } from 'src/shared/pipes/file-validation.pipe';

import { createWriteStream } from 'fs';
import { join } from 'path';
import * as FileUpload from 'graphql-upload/Upload.mjs';
// import { FileUpload } from 'graphql-upload';

@Resolver('File')
export class FileResolver {
  constructor(private readonly fileService: FileService) {}

  // @Authorization()
  // @Mutation(() => Boolean, { name: 'changeProfileAvatar' })
  // // @UseInterceptors(FileInterceptor('file', { storage: fileStorage }))
  // public async upload(
  //   @Authorized() user: User,
  //   @Args('file', { type: () => GraphQLUpload }, FileValidationPipe)
  //   file: Upload,
  // ) {
  //   return this.fileService.upload(user, file);
  // }

  @Mutation(() => String, { name: 'uploadFile' })
  async uploadFile1(@Args({ name: 'file', type: () => GraphQLUpload }) file: any) {

  }
  async uploadFile(@Args({ name: 'file', type: () => GraphQLUpload }) file: any, @Context() context): Promise<string> {
    console.log('Headers:', context.req.headers); 
    const { createReadStream, filename } = await file;
    const filePath = join(__dirname, '../../uploads', filename);
    console.log(filePath);
    return new Promise((resolve, reject) => {
      createReadStream()
        .pipe(createWriteStream(filePath))
        .on('finish', () => resolve(`Файл загружен: ${filename}`))
        .on('error', reject);
    });
  }

  /*  */
  /*  */
  /*  */
  /*  */
  /*  */

  // @Authorization()
  // @Mutation(() => Boolean, { name: 'changeStreamThumbnail' })
  // public async changeThumbnail(
  //   @Authorized() user: User,
  //   @Args('thumbnail', { type: () => GraphQLUpload }, FileValidationPipe)
  //   thumbnail: Upload,
  // ) {
  //   return this.fileService.changeThumbnail(user, thumbnail);
  // }

  // @Authorization()
  // @Mutation(() => Boolean, { name: 'removeStreamThumbnail' })
  // public async removeThumbnail(@Authorized() user: User) {
  //   return this.fileService.removeThumbnail(user);
  // }

  //
  //
  //
  //
  //
  // @Mutation(() => String)
  // async uploadFile(@Args('input') input: UploadFileInput): Promise<string> {
  //   return await this.fileService.saveFile(input.file);
  // }
}
