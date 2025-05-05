"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NlpService = void 0;
const path = require('path');
const python_shell_1 = require("python-shell");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const SCRIPT_PATH = path.join(process.cwd(), 'src/modules/nlp/python/analyze.py');
let NlpService = class NlpService {
    constructor(configService) {
        this.configService = configService;
        this.PYTHON_PATH = this.configService.getOrThrow('PYTHON_PATH') || 'python';
    }
    async analyze(text) {
        return new Promise(async (resolve, reject) => {
            const pyshell = new python_shell_1.PythonShell(SCRIPT_PATH, {
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
            }, 10000);
            pyshell.on('message', (message) => {
                result += message;
            });
            pyshell.end((err) => {
                if (isResolved)
                    return;
                clearTimeout(timeout);
                if (err) {
                    isResolved = true;
                    reject(err);
                    console.log('err:', err);
                }
                else {
                    isResolved = true;
                    try {
                        const entities = JSON.parse(result ? result : '{}');
                        console.log('entities:', entities);
                        resolve(entities);
                    }
                    catch (parseError) {
                        reject('Неможливо розпарсити відповідь Python скрипта');
                    }
                }
            });
        });
    }
};
exports.NlpService = NlpService;
exports.NlpService = NlpService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], NlpService);
//# sourceMappingURL=nlp.service.js.map