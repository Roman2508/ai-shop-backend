import { NlpProcessor } from './nlp.processor';
export declare class NlpService {
    private readonly nlpProcessor;
    constructor(nlpProcessor: NlpProcessor);
    analyze(text: string): Promise<any>;
}
