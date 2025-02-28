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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const nlp_service_1 = require("./../nlp/nlp.service");
const prisma_service_1 = require("../../core/prisma/prisma.service");
let ProductService = class ProductService {
    constructor(nlpService, prismaService) {
        this.nlpService = nlpService;
        this.prismaService = prismaService;
    }
    async search(input) {
        const response = await this.nlpService.analyze(input);
        if (response.message !== 'success') {
            throw new common_1.BadRequestException('Помилка');
        }
        const queryObject = JSON.parse(response.text);
        console.log(queryObject);
        const products = await this.prismaService.product.findMany({ where: queryObject });
        if (!products.length) {
            throw new common_1.NotFoundException('Нічого не знайдено');
        }
        return products;
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nlp_service_1.NlpService,
        prisma_service_1.PrismaService])
], ProductService);
//# sourceMappingURL=product.service.js.map