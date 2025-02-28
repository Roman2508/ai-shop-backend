import { Injectable } from '@nestjs/common';
import { NlpProcessor } from './nlp.processor';

@Injectable()
export class NlpService {
  constructor(private readonly nlpProcessor: NlpProcessor) {}

  async analyze(text: string) {
    return this.nlpProcessor.analyzeText(text);
  }
}
