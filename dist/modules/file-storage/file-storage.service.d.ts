import { ConfigService } from '@nestjs/config';
export declare class StorageService {
    private readonly configService;
    private readonly client;
    private readonly bucket;
    constructor(configService: ConfigService);
    upload(buffer: Buffer, key: string, mimetype: string): Promise<void>;
    remove(key: string): Promise<void>;
}
