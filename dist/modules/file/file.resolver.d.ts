import { FileService } from './file.service';
export declare class FileResolver {
    private readonly fileService;
    constructor(fileService: FileService);
    uploadFile1(file: any): Promise<void>;
    uploadFile(file: any, context: any): Promise<string>;
}
