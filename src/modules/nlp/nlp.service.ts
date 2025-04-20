import { Injectable } from '@nestjs/common';
const path = require('path');
import { PythonShell } from 'python-shell';

const PYTHON_PATH = path.join(process.cwd(), 'src/modules/nlp/python/venv/Scripts/python.exe');
const VENV_ACTIVATE = path.join(process.cwd(), 'src/modules/nlp/python/venv/Scripts/activate');
const SCRIPT_PATH = path.join(process.cwd(), 'src/modules/nlp/python/analyze.py');

@Injectable()
export class NlpService {
  async analyze(text: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await PythonShell.run(SCRIPT_PATH, {
          args: [text],
          pythonPath: PYTHON_PATH,
          env: {
            ...process.env,
            PATH: PYTHON_PATH,
            VIRTUAL_ENV: VENV_ACTIVATE,
          },
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
