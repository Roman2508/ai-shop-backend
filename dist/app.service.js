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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const sdk_1 = require("@anthropic-ai/sdk");
const groq_sdk_1 = require("groq-sdk");
var nlp = require('compromise');
let AppService = class AppService {
    constructor() {
        this.anthropic = new sdk_1.default({
            apiKey: process.env.ANTHROPIC_API_KEY,
        });
        this.groq = new groq_sdk_1.default({ apiKey: process.env.GROQ_API_KEY });
    }
    async a() {
        let doc = nlp('she sells seashells by the seashore. price seashells is 100 dollars');
        doc.verbs().toPastTense();
        doc.text();
        if (doc.has('price')) {
            return { a: doc.text(), b: true };
        }
        return { a: doc.text(), b: false };
    }
    async getHello() {
        return this.groq.chat.completions.create({
            messages: [
                {
                    role: 'user',
                    content: 'tell me how to create filters in an online store that will use ai to search for products in the database',
                },
            ],
            model: 'llama-3.3-70b-versatile',
            max_tokens: 100,
        });
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AppService);
//# sourceMappingURL=app.service.js.map