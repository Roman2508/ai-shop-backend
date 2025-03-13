const path = require('path');

import { createWriteStream } from 'fs';
import { Injectable } from '@nestjs/common';
import * as Upload from 'graphql-upload/Upload.js';

@Injectable()
export class FileService {
  constructor() {}

  generateId = () => {
    return [...Array(6)].map(() => Math.round(Math.random() * 6).toString(6)).join('');
  };

  async upload(file: Upload, folderName: 'products' | 'users' = 'products') {
    const { createReadStream, filename } = await file;

    const newFilename = `${this.generateId()}_${filename}`;
    const filePath = path.join(process.cwd(), `uploads/${folderName}`, newFilename);

    await new Promise((resolve, reject) => {
      createReadStream()
        .pipe(createWriteStream(filePath))
        .on('finish', () => resolve(`Файл завантажений: ${newFilename}`))
        .on('error', reject);
    });

    return newFilename;
  }

  // async upload(user: User, file: Upload) {
  //   if (user.avatar) {
  //     await this.storageService.remove(user.avatar);
  //   }

  //   const chunks: Buffer[] = [];

  //   for await (const chunk of file.createReadStream()) {
  //     chunks.push(chunk);
  //   }

  //   const buffer = Buffer.concat(chunks);

  //   const fileName = `/channels/${user.username}.webp`;

  //   if (file.filename && file.filename.endsWith('.gif')) {
  //     const processedBuffer = await sharp(buffer, { animated: true }).resize(512, 512).webp().toBuffer();

  //     await this.storageService.upload(processedBuffer, fileName, 'image/webp');
  //   } else {
  //     const processedBuffer = await sharp(buffer).resize(512, 512).webp().toBuffer();

  //     await this.storageService.upload(processedBuffer, fileName, 'image/webp');
  //   }

  //   await this.prismaService.user.update({
  //     where: {
  //       id: user.id,
  //     },
  //     data: {
  //       avatar: fileName,
  //     },
  //   });

  //   return true;
  // }

  /*  */
  /*  */
  /*  */
  /*  */
  /*  */
  /*  */

  // public async changeThumbnail(user: User, file: Upload) {
  //   const stream = await this.findByUserId(user);

  //   if (stream.thumbnailUrl) {
  //     await this.storageService.remove(stream.thumbnailUrl);
  //   }

  //   const chunks: Buffer[] = [];

  //   for await (const chunk of file.createReadStream()) {
  //     chunks.push(chunk);
  //   }

  //   const buffer = Buffer.concat(chunks);

  //   const fileName = `/streams/${user.username}.webp`;

  //   if (file.filename && file.filename.endsWith('.gif')) {
  //     const processedBuffer = await sharp(buffer, { animated: true }).resize(1280, 720).webp().toBuffer();

  //     await this.storageService.upload(processedBuffer, fileName, 'image/webp');
  //   } else {
  //     const processedBuffer = await sharp(buffer).resize(1280, 720).webp().toBuffer();

  //     await this.storageService.upload(processedBuffer, fileName, 'image/webp');
  //   }

  //   await this.prismaService.stream.update({
  //     where: {
  //       userId: user.id,
  //     },
  //     data: {
  //       thumbnailUrl: fileName,
  //     },
  //   });

  //   return true;
  // }

  // public async removeThumbnail(user: User) {
  //   const stream = await this.findByUserId(user);

  //   if (!stream.thumbnailUrl) {
  //     return;
  //   }

  //   await this.storageService.remove(stream.thumbnailUrl);

  //   await this.prismaService.stream.update({
  //     where: {
  //       userId: user.id,
  //     },
  //     data: {
  //       thumbnailUrl: null,
  //     },
  //   });

  //   return true;
  // }

  //
  //
  //
  //
  //
  // async saveFile(file: Promise<GraphQLUpload>): Promise<string> {
  //   const { createReadStream, filename } = await file;

  //   const filePath = path.join(process.cwd(), 'uploads', filename); // Путь сохранения файла

  //   return new Promise((resolve, reject) => {
  //     createReadStream()
  //       .pipe(fs.createWriteStream(filePath)) // Сохраняем файл в локальную папку
  //       .on('finish', () => resolve(`/uploads/${filename}`)) // Возвращаем URL файла
  //       .on('error', reject);
  //   });
  // }

  //
  //
  //

  //   async saveFiles(files: Express.Multer.File[], folder: string = 'products') {
  //     const uploadedFolder = `${PATH}/${folder}`;

  //     await ensureDir(uploadedFolder);

  //     const response: FileResponse[] = await Promise.all(
  //       files.map(async (file) => {
  //         const originalName = `${Date.now()}-${file.originalname}`;

  //         await writeFile(`${uploadedFolder}/${originalName}`, file.buffer);

  //         return {
  //           url: `/uploads/${folder}/${originalName}`,
  //           name: originalName,
  //         };
  //       }),
  //     );

  //     return response;
  //   }
}
