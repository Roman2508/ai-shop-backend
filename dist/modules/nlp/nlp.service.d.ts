import { ConfigService } from '@nestjs/config';
export declare class NlpService {
    private readonly configService;
    private readonly PYTHON_PATH_NLP;
    constructor(configService: ConfigService);
    analyze(text: string): Promise<any>;
}
