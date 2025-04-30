import { type ArgumentMetadata, BadRequestException, Injectable, type PipeTransform } from '@nestjs/common';
import { ReadStream } from 'fs';

import { validateFileFormat, validateFileSize } from '../utils/file.util';

const MAX_FILE_SIZE_MB = 10;

@Injectable()
export class FileValidationPipe implements PipeTransform {
  public async transform(value: any, metadata: ArgumentMetadata) {
    if (!value.filename) {
      throw new BadRequestException('Файл не загружен');
    }

    const { filename, createReadStream } = value;

    const fileStream = createReadStream() as ReadStream;

    const allowedFormats = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
    const isFileFormatValid = validateFileFormat(filename, allowedFormats);

    if (!isFileFormatValid) {
      throw new BadRequestException('Формат файла не підтримується');
    }

    const isFileSizeValid = await validateFileSize(fileStream, MAX_FILE_SIZE_MB * 1024 * 1024);

    if (!isFileSizeValid) {
      throw new BadRequestException('Розмір файла перевищує 10 МБ');
    }

    return value;
  }
}
