import Anthropic from '@anthropic-ai/sdk';
import Groq from 'groq-sdk';
export declare class AppService {
    anthropic: Anthropic;
    groq: Groq;
    constructor();
    getHello(): Promise<Groq.Chat.Completions.ChatCompletion>;
}
