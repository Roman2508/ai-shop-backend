import { FileService } from './file.service';
import { User } from 'prisma/generated';
import * as Upload from 'graphql-upload/Upload.js';
export declare class FileResolver {
    private readonly fileService;
    constructor(fileService: FileService);
    changeThumbnail(user: User, thumbnail: Upload): Promise<boolean>;
    removeThumbnail(user: User): Promise<boolean>;
}
