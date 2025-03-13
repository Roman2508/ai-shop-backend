import * as Upload from 'graphql-upload/Upload.js';
export declare class FileService {
    constructor();
    generateId: () => string;
    upload(file: Upload, folderName?: 'products' | 'users'): Promise<string>;
}
