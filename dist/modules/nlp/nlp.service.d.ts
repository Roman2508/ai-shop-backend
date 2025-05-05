import { ConfigService } from '@nestjs/config';
export declare class NlpService {
    private readonly configService;
    private readonly PYTHON_PATH;
    constructor(configService: ConfigService);
    analyze(text: string): Promise<any>;
}
