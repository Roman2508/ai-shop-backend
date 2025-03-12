import { ReadStream } from 'fs';
export declare function validateFileFormat(filename: string, allowedFileFormats: string[]): boolean;
export declare function validateFileSize(fileStream: ReadStream, allowedFileSizeInBytes: number): Promise<unknown>;
