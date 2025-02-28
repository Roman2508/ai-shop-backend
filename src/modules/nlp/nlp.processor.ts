import { spawn, exec } from 'child_process';
import { Injectable } from '@nestjs/common';

// const PYTHON_PATH = 'C:\PAPKA\projects\ai-shop\backend\src\modules\nlp\python\analyze.py';
// const PYTHON_PATH = './src/modules/nlp/python/analyze.py';
// const pythonPath = 'C:\PAPKA\projects\ai-shop\backend\src\modules\nlp\python\venv\Scripts\python.exe';
// const pythonPath = 'C:\\PAPKA\\projects\\ai-shop\\backend\\src\\modules\\nlp\\python\\venv\\Scripts\\python.exe';

const pythonPath = 'C:\\PAPKA\\projects\\ai-shop\\backend\\src\\modules\\nlp\\python\\venv\\Scripts\\python.exe';

// Путь к Python-скрипту
const pythonScriptPath = 'C:\\PAPKA\\projects\\ai-shop\\backend\\src\\modules\\nlp\\python\\analyze.py';

@Injectable()
export class NlpProcessor {
  async analyzeText(text: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const pythonProcess = exec(`${pythonPath} ${pythonScriptPath} "${text}"`, (error, stdout, stderr) => {
        // const pythonProcess = exec(`python ${PYTHON_PATH} "${text}"`, (error, stdout, stderr) => {
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

      return pythonProcess
    });

    // return new Promise((resolve, reject) => {
    //   console.log(text);
    //   const pythonProcess = spawn('python3', [PYTHON_PATH, text]);

    //   let output = '';
    //   pythonProcess.stdout.on('data', (data) => {
    //     output += data.toString();
    //   });

    //   pythonProcess.stderr.on('data', (data) => {
    //     console.error(`Ошибка: ${data}`);
    //     reject(data.toString());
    //   });

    //   pythonProcess.on('close', () => {
    //     resolve(JSON.parse(output));
    //   });
    // });
  }
}
