const path = require('path');
import { exec } from 'child_process';
import { Injectable } from '@nestjs/common';

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

        console.log('stdout', `===${stdout}===`);

        try {
          const result = JSON.parse(JSON.stringify(stdout));
          resolve(result);
        } catch (parseError) {
          reject(`Error parsing JSON from Python output: ${parseError.message}`);
        }
      });
    });
  }
}
