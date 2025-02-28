"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NlpProcessor = void 0;
const child_process_1 = require("child_process");
const common_1 = require("@nestjs/common");
const pythonPath = 'C:\\PAPKA\\projects\\ai-shop\\backend\\src\\modules\\nlp\\python\\venv\\Scripts\\python.exe';
const pythonScriptPath = 'C:\\PAPKA\\projects\\ai-shop\\backend\\src\\modules\\nlp\\python\\analyze.py';
let NlpProcessor = class NlpProcessor {
    async analyzeText(text) {
        return new Promise((resolve, reject) => {
            const pythonProcess = (0, child_process_1.exec)(`${pythonPath} ${pythonScriptPath} "${text}"`, (error, stdout, stderr) => {
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
                }
                catch (parseError) {
                    reject(`Error parsing JSON from Python output: ${parseError.message}`);
                }
            });
            return pythonProcess;
        });
    }
};
exports.NlpProcessor = NlpProcessor;
exports.NlpProcessor = NlpProcessor = __decorate([
    (0, common_1.Injectable)()
], NlpProcessor);
//# sourceMappingURL=nlp.processor.js.map