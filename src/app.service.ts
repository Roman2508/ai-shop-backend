import { Injectable } from '@nestjs/common';
import Anthropic from '@anthropic-ai/sdk';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { ChatGroq } from '@langchain/groq';
import Groq from 'groq-sdk';

@Injectable()
export class AppService {
  anthropic: Anthropic;
  // groq: ChatGroq;
  groq: Groq;

  constructor() {
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    // this.groq = new ChatGroq({
    //   apiKey: process.env.GROQ_API_KEY,
    //   model: 'mixtral-8x7b-32768',
    //   temperature: 0,
    // });

    this.groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  }

  async getHello() {
    return this.groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content:
            'tell me how to create filters in an online store that will use ai to search for products in the database',
        },
      ],
      model: 'llama-3.3-70b-versatile',
      max_tokens: 100,

      // model: 'llama-3.3-70b-versatile',
    });
  }

  // async getHello() {
  //   const messages = [
  //     new SystemMessage('Translate the following from English into ukrainian'),
  //     new HumanMessage('hi!'),
  //   ];

  //   await this.groq.invoke(messages);
  // }

  // async getHello() {
  //   console.log(process.env.ANTHROPIC_API_KEY);
  //   const msg = await this.anthropic.messages.create({
  //     model: 'claude-2.0',
  //     // model: 'claude-3-5-sonnet-20241022',
  //     max_tokens: 20,
  //     temperature: 0,
  //     system: 'Respond only with short poems.',
  //     messages: [
  //       {
  //         role: 'user',
  //         content: [
  //           {
  //             type: 'text',
  //             text: 'Why is the ocean salty?',
  //           },
  //         ],
  //       },
  //     ],
  //   });
  //   console.log(msg);
  //   return msg;
  // }
}
