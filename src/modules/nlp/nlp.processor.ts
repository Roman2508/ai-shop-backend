const path = require('path');
const { spawn } = require('child_process');
import { exec } from 'child_process';
import { Injectable } from '@nestjs/common';

// ✅ Решение 1: Указываем путь через venv/Scripts/activate
const VENV_ACTIVATE = path.join(process.cwd(), 'src/modules/nlp/python/venv/Scripts/activate');
const SCRIPT_PATH = path.join(process.cwd(), 'src/modules/nlp/python/analyze.py');

@Injectable()
export class NlpProcessor {
  async analyzeText(text: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const command = `cmd /c "call ${VENV_ACTIVATE} && python ${SCRIPT_PATH} "${text}""`;

      exec(command, (error, stdout, stderr) => {
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
    });
  }
}

/*  */
/*  */
/*  */

// // ✅ Решение 2: Используем spawn (лучше, чем exec)
// const PYTHON_PATH = path.join(process.cwd(), 'src/modules/nlp/python/venv/Scripts/python.exe');
// const SCRIPT_PATH = path.join(process.cwd(), 'src/modules/nlp/python/analyze.py');

// @Injectable()
// export class NlpProcessor {
//   async analyzeText(text: string): Promise<any> {
//     return new Promise((resolve, reject) => {
//       const pythonProcess = spawn(PYTHON_PATH, [SCRIPT_PATH, text]);

//       let output = '';
//       let errorOutput = '';

//       pythonProcess.stdout.on('data', (data) => {
//         output += data.toString();
//       });

//       pythonProcess.stderr.on('data', (data) => {
//         errorOutput += data.toString();
//       });

//       pythonProcess.on('close', (code) => {
//         if (code !== 0) {
//           reject(`Python script exited with code ${code}: ${errorOutput}`);
//           return;
//         }

//         try {
//           const result = JSON.parse(output);
//           resolve(result);
//         } catch (parseError) {
//           reject(`Error parsing JSON from Python output: ${parseError.message}`);
//         }
//       });
//     });
//   }
// }

/*  */
/*  */
/*  */

// // const FILE_PATH = 'C:\\PAPKA\\projects\\ai-shop\\backend\\src\\modules\\nlp\\python\\venv\\Scripts\\python.exe';
// const FILE_PATH = path.join(process.cwd(), 'src/modules/nlp/python/venv/Scripts/python.exe');

// // Путь к Python-скрипту
// // const SCRIPT_PATH = 'C:\\PAPKA\\projects\\ai-shop\\backend\\src\\modules\\nlp\\python\\analyze.py';
// const SCRIPT_PATH = path.join(process.cwd(), 'src/modules/nlp/python/analyze.py');

// @Injectable()
// export class NlpProcessor {
//   async analyzeText(text: string): Promise<any> {
//     return new Promise((resolve, reject) => {
//       const pythonProcess = exec(`${FILE_PATH} ${SCRIPT_PATH} "${text}"`, (error, stdout, stderr) => {
//         if (error) {
//           reject(`Error executing Python script: ${error.message}`);
//           return;
//         }

//         if (stderr) {
//           reject(`stderr: ${stderr}`);
//           return;
//         }

//         console.log(stdout);
//         try {
//           const result = JSON.parse(stdout);
//           resolve(result);
//         } catch (parseError) {
//           reject(`Error parsing JSON from Python output: ${parseError.message}`);
//         }
//       });

//       return pythonProcess;
//     });
//   }
// }
