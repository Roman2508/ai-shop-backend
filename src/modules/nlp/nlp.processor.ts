const path = require('path');
import { exec } from 'child_process';
import { PythonShell } from 'python-shell';
import { Injectable } from '@nestjs/common';

const PYTHON_PATH = path.join(process.cwd(), 'src/modules/nlp/python/venv/Scripts/python.exe');
const VENV_ACTIVATE = path.join(process.cwd(), 'src/modules/nlp/python/venv/Scripts/activate');
const SCRIPT_PATH = path.join(process.cwd(), 'src/modules/nlp/python/analyze.py');

@Injectable()
export class NlpProcessor {
  async analyzeText(text: string): Promise<any> {
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
        const embedding = JSON.parse(result[0]);
        resolve(embedding);
      } catch (e) {
        reject(e);
      }
    });

    // return new Promise((resolve, reject) => {
    //   const command = `cmd /c "call ${VENV_ACTIVATE} && python ${SCRIPT_PATH} "${text}""`;

    //   exec(command, (error, stdout, stderr) => {
    //     if (error) {
    //       reject(`Error executing Python script: ${error.message}`);
    //       return;
    //     }

    //     if (stderr) {
    //       reject(`stderr: ${stderr}`);
    //       return;
    //     }

    //     console.log('stdout', `===${stdout}===`);

    //     try {
    //       const result = JSON.parse(JSON.stringify(stdout));
    //       resolve(result);
    //     } catch (parseError) {
    //       reject(`Error parsing JSON from Python output: ${parseError.message}`);
    //     }
    //   });
    // });
  }
}
