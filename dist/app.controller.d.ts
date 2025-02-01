import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): Promise<import("groq-sdk/resources/chat/completions").ChatCompletion>;
    a(): Promise<{
        a: any;
        b: boolean;
    }>;
}
