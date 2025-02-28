import { NlpService } from './nlp.service';
export declare class NlpController {
    private readonly nlpService;
    constructor(nlpService: NlpService);
    analyze(text: string): Promise<any>;
}
