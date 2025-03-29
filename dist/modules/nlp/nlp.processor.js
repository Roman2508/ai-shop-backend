"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NlpProcessor = void 0;
const path = require('path');
const python_shell_1 = require("python-shell");
const common_1 = require("@nestjs/common");
const PYTHON_PATH = path.join(process.cwd(), 'src/modules/nlp/python/venv/Scripts/python.exe');
const VENV_ACTIVATE = path.join(process.cwd(), 'src/modules/nlp/python/venv/Scripts/activate');
const SCRIPT_PATH = path.join(process.cwd(), 'src/modules/nlp/python/analyze.py');
let NlpProcessor = class NlpProcessor {
    async analyzeText(text) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await python_shell_1.PythonShell.run(SCRIPT_PATH, {
                    args: [text],
                    pythonPath: PYTHON_PATH,
                    env: {
                        ...process.env,
                        PATH: PYTHON_PATH,
                        VIRTUAL_ENV: VENV_ACTIVATE,
                    },
                });
                console.log('result:', result);
                if (!result)
                    return reject('No result from Python script');
                const embedding = JSON.parse(result[0]);
                resolve(embedding);
            }
            catch (e) {
                reject(e);
            }
        });
    }
};
exports.NlpProcessor = NlpProcessor;
exports.NlpProcessor = NlpProcessor = __decorate([
    (0, common_1.Injectable)()
], NlpProcessor);
//# sourceMappingURL=nlp.processor.js.map