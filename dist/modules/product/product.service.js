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
    async getAll() {
        return this.prismaService.product.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async getById(id) {
        const product = await this.prismaService.product.findUnique({
            where: { id },
            include: {
                reviews: {
                    include: {
                        user: true,
                    },
                },
            },
        });
        if (!product)
            throw new common_1.NotFoundException('Товар не знайдено');
        return product;
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
    async getMostPopular() {
        const mostPopularProducts = await this.prismaService.orderItem.groupBy({
            by: ['productId'],
            _count: { id: true },
            orderBy: { _count: { id: 'desc' } },
        });
        const productIds = mostPopularProducts.map((item) => item.productId);
        const products = await this.prismaService.product.findMany({
            where: { id: { in: productIds } },
        });
        return products;
    }
    async getSimilar(id) {
        const currentProduct = await this.getById(id);
        if (!currentProduct)
            throw new common_1.NotFoundException('Поточний товар не знайдений');
        const products = await this.prismaService.product.findMany({
            where: {
                title: currentProduct.title,
                NOT: { id: currentProduct.id },
            },
            orderBy: { createdAt: 'desc' },
        });
        return products;
    }
    async create(input) {
        await this.prismaService.product.create({ data: input });
        return true;
    }
    async update(input) {
        const { productId, ...data } = input;
        await this.prismaService.product.update({
            where: { id: productId },
            data,
        });
        return true;
    }
    async delete(id) {
        this.getById(id);
        return this.prismaService.product.delete({ where: { id } });
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nlp_service_1.NlpService,
        prisma_service_1.PrismaService])
], ProductService);
//# sourceMappingURL=product.service.js.map