const path = require('path');

import { exec } from 'child_process';
import { Injectable } from '@nestjs/common';

// const pythonPath = 'C:\\PAPKA\\projects\\ai-shop\\backend\\src\\modules\\nlp\\python\\venv\\Scripts\\python.exe';
const pythonFilePath = path.join(process.cwd(), 'src/modules/nlp/python/venv/Scripts/python.exe');

// Путь к Python-скрипту
// const pythonScriptPath = 'C:\\PAPKA\\projects\\ai-shop\\backend\\src\\modules\\nlp\\python\\analyze.py';
const pythonScriptPath = path.join(process.cwd(), 'src/modules/nlp/python/analyze.py');

@Injectable()
export class NlpProcessor {
  async analyzeText(text: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const pythonProcess = exec(`${pythonFilePath} ${pythonScriptPath} "${text}"`, (error, stdout, stderr) => {
        if (error) {
          reject(`Error executing Python script: ${error.message}`);
          return;
        }
        if (stderr) {
          reject(`stderr: ${stderr}`);
          return;
        }

        console.log(stdout);
        try {
          const result = JSON.parse(stdout);
          resolve(result);
        } catch (parseError) {
          reject(`Error parsing JSON from Python output: ${parseError.message}`);
        }
      });

      return pythonProcess;
    });
  }
}
