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
exports.ReviewService = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("../product/product.service");
const prisma_service_1 = require("../../core/prisma/prisma.service");
let ReviewService = class ReviewService {
    constructor(prismaService, productService) {
        this.prismaService = prismaService;
        this.productService = productService;
    }
    async create(userId, input) {
        const { productId, ...data } = input;
        await this.productService.getById(productId);
        return this.prismaService.review.create({
            data: {
                ...data,
                product: { connect: { id: productId } },
                user: { connect: { id: userId } },
            },
        });
    }
    async delete(userId, id) {
        const review = await this.prismaService.review.findUnique({
            where: { id, userId },
            include: { user: true },
        });
        if (!review)
            throw new common_1.NotFoundException('Відгук не знайдено або ви не є його автором');
        return this.prismaService.review.delete({ where: { id } });
    }
};
exports.ReviewService = ReviewService;
exports.ReviewService = ReviewService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        product_service_1.ProductService])
], ReviewService);
//# sourceMappingURL=review.service.js.map