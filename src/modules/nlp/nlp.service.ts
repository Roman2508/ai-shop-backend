const path = require('path');
import { PythonShell } from 'python-shell';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// const PYTHON_PATH = path.join(process.cwd(), 'src/modules/nlp/python/venv/Scripts/python.exe');
// const VENV_ACTIVATE = path.join(process.cwd(), 'src/modules/nlp/python/venv/Scripts/activate');
const SCRIPT_PATH = path.join(process.cwd(), 'src/modules/nlp/python/analyze.py');

@Injectable()
export class NlpService {
  private readonly PYTHON_PATH_NLP: string;

  constructor(private readonly configService: ConfigService) {
    this.PYTHON_PATH_NLP = this.configService.getOrThrow<string>('PYTHON_PATH_NLP') || 'python';
  }

  async analyze(text: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await PythonShell.run(SCRIPT_PATH, {
          args: [text],
          pythonPath: this.PYTHON_PATH_NLP || 'python',
        });
        console.log('result:', result);
        if (!result) return reject('No result from Python script');
        const embedding = JSON.parse(result[1]);
        resolve(embedding);
      } catch (e) {
        reject(e);
      }
    });
  }
}
