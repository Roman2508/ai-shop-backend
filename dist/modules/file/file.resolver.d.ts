import { FileService } from './file.service';
export declare class FileResolver {
    private readonly fileService;
    constructor(fileService: FileService);
    uploadFile(file: any): Promise<unknown>;
}
