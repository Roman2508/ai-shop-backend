const path = require('path');
import { PythonShell } from 'python-shell';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const SCRIPT_PATH = path.join(process.cwd(), 'src/modules/nlp/python/analyze.py');

@Injectable()
export class NlpService {
  private readonly PYTHON_PATH: string;

  constructor(private readonly configService: ConfigService) {
    this.PYTHON_PATH = this.configService.getOrThrow<string>('PYTHON_PATH') || 'python';
  }

  async analyze(text: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const pyshell = new PythonShell(SCRIPT_PATH, {
        args: [text],
        pythonPath: this.PYTHON_PATH || 'python',
      });

      let result = '';
      let isResolved = false;

      const timeout = setTimeout(() => {
        if (!isResolved) {
          isResolved = true;
          pyshell.terminate();
          console.log('timeout');
          resolve('');
        }
      }, 5000);

      pyshell.on('message', (message) => {
        result += message;
      });

      pyshell.end((err) => {
        if (isResolved) return;

        clearTimeout(timeout);

        if (err) {
          isResolved = true;
          reject(err);
          console.log('err:', err);
        } else {
          isResolved = true;
          try {
            const entities = JSON.parse(result ? result : '{}');
            console.log('entities:', entities);
            resolve(entities);
          } catch (parseError) {
            reject('Неможливо розпарсити відповідь Python скрипта');
          }
        }
      });
    });
  }
  // async analyze(text: string): Promise<any> {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       const result = await PythonShell.run(SCRIPT_PATH, {
  //         args: [text],
  //         pythonPath: this.PYTHON_PATH || 'python',
  //       });

  //       console.log('result:', result);

  //       if (!result) return reject('No result from Python script');
  //       const embedding = JSON.parse(result[1]);
  //       resolve(embedding);
  //     } catch (e) {
  //       reject(e);
  //     }
  //   });
  // }
}
