import * as Upload from 'graphql-upload/Upload.js';
export declare class FileService {
    private readonly storageService;
    constructor(storageService: any);
    changeThumbnail(user: User, file: Upload): Promise<boolean>;
    removeThumbnail(user: User): Promise<boolean>;
}
