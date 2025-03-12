import { User } from 'prisma/generated';
import * as Upload from 'graphql-upload/Upload.js';
export declare class FileService {
    constructor();
    upload(user: User, file: Upload): Promise<void>;
}
