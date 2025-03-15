const path = require('path');

import * as fs from 'fs';
import { createWriteStream } from 'fs';
import { Injectable, NotFoundException } from '@nestjs/common';
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

  async removeFile(filename: string, folderName: string) {
    const filePath = path.join(process.cwd(), `uploads/${folderName}`, filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    } else {
      throw new NotFoundException('Файл не знайдено');
    }

    return true;
  }
}
