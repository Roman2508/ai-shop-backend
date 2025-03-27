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
const fs = require("fs");
const common_1 = require("@nestjs/common");
const nlp_service_1 = require("./../nlp/nlp.service");
const file_service_1 = require("../file/file.service");
const prisma_service_1 = require("../../core/prisma/prisma.service");
const convert_keys_to_camel_util_1 = require("../../shared/utils/convert-keys-to-camel.util");
const recommendation_service_1 = require("../recommendation/recommendation.service");
let ProductService = class ProductService {
    constructor(nlpService, fileService, prismaService, recommendationService) {
        this.nlpService = nlpService;
        this.fileService = fileService;
        this.prismaService = prismaService;
        this.recommendationService = recommendationService;
    }
    async getAll() {
        const total = await this.prismaService.product.count();
        const products = await this.prismaService.product.findMany({
            orderBy: { createdAt: 'desc' },
            take: 24,
            skip: 0,
        });
        return { products, total };
    }
    async paginateAndFilter(query) {
        const { sortBy, limit, skip, priceFrom, priceTo, ...filterParams } = query;
        const filter = [];
        const order = {};
        if (sortBy) {
            if (sortBy === 'price:asc') {
                order.price = 'asc';
            }
            else if (sortBy === 'price:desc') {
                order.price = 'desc';
            }
            else if (sortBy === 'new') {
                order.createdAt = 'asc';
            }
            else if (sortBy === 'rating') {
                order.createdAt = 'desc';
            }
        }
        else {
            order.createdAt = 'desc';
        }
        if (priceFrom && priceTo) {
            filter.push({ OR: { gte: query.priceFrom, lte: query.priceTo } });
        }
        if (priceFrom && !priceTo) {
            filter.push({ OR: { gte: query.priceFrom } });
        }
        if (!priceFrom && priceTo) {
            filter.push({ OR: { lte: query.priceTo } });
        }
        if (Object.keys(filterParams).length) {
            const keys = ['ram', 'builtInMemory', 'frontCamera', 'mainCamera', 'screenDiagonal', 'battery'];
            for (const key in filterParams) {
                if (keys.includes(key)) {
                    const selectedFilters = filterParams[key].split(';');
                    const keyFilter = [];
                    selectedFilters.forEach((f) => {
                        const [from, to] = f.split('-');
                        keyFilter.push({ [key]: { gte: Number(from), lte: Number(to) } });
                    });
                    filter.push({ OR: keyFilter });
                }
                else if (key === 'simFormat' || key === 'deliverySet') {
                    const selectedFilters = filterParams[key].split(';');
                    filter.push({ OR: { [key]: { hasSome: selectedFilters } } });
                }
                else {
                    const query = filterParams[key].split(';');
                    const queryFilter = query.map((q) => ({ [key]: { contains: q } }));
                    filter.push({ OR: queryFilter });
                }
            }
        }
        const products = await this.prismaService.product.findMany({
            where: { AND: filter },
            orderBy: order,
            take: limit ? limit : 24,
            skip: skip ? skip : 0,
        });
        let totalProductsCount = 0;
        if (priceFrom || priceTo || Object.keys(filterParams).length) {
            totalProductsCount = products.length;
        }
        else {
            totalProductsCount = await this.prismaService.product.count();
        }
        return { products, total: totalProductsCount };
    }
    async getById(id) {
        const product = await this.prismaService.product.findUnique({
            where: { id },
            include: {
                reviews: {
                    include: {
                        user: true,
                        product: true,
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
        if (!response) {
            throw new common_1.BadRequestException('Помилка');
        }
        const queryObject = JSON.parse(response);
        let prismaQueryObject;
        if (typeof (0, convert_keys_to_camel_util_1.convertKeysToCamel)(queryObject) === 'string') {
            prismaQueryObject = JSON.parse((0, convert_keys_to_camel_util_1.convertKeysToCamel)(queryObject));
        }
        else {
            prismaQueryObject = (0, convert_keys_to_camel_util_1.convertKeysToCamel)(queryObject);
        }
        const products = await this.prismaService.product.findMany({ where: prismaQueryObject });
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
        const newProduct = await this.prismaService.product.create({ data: input });
        await this.recommendationService.createProduct(newProduct);
        return newProduct;
    }
    async addPhoto(id, file) {
        const filename = await this.fileService.upload(file, 'products');
        await this.prismaService.product.update({ where: { id }, data: { images: { push: filename } } });
        return true;
    }
    async removePhotos(id, filename) {
        const product = await this.prismaService.product.findUnique({ where: { id } });
        if (!product)
            throw new common_1.NotFoundException('Товар не знайдено');
        await this.fileService.removeFile(filename, 'products');
        const filteredImages = product.images.filter((el) => el !== filename);
        await this.prismaService.product.update({ where: { id }, data: { images: filteredImages } });
        return true;
    }
    async createMany() {
        const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
        const dataWithCorrectTypes = data.map((el) => ({
            ...el,
            price: Number(el.price),
            ram: Number(el.ram.split(' ')[0]),
            builtInMemory: Number(el.builtInMemory.split(' ')[0]),
            frontCamera: Number(el.frontCamera.split(' ')[0]),
            mainCamera: Number(el.mainCamera.split(' ')[0]),
            screenDiagonal: Number(el.screenDiagonal),
            simCount: Number(el.simCount),
            battery: Number(el.battery.split(' ')[0]),
            simFormat: JSON.parse(el.simFormat.replace(/'/g, '"')),
            processorCores: String(el.processorCores),
        }));
        await this.prismaService.product.createMany({ data: dataWithCorrectTypes });
        const products = await this.prismaService.product.findMany();
        await Promise.all(products.map(async (el) => {
            await this.recommendationService.createProduct(el);
        }));
        console.log('Дані успішно імпортовано');
        return true;
    }
    async update(input) {
        const { productId, ...data } = input;
        await this.prismaService.product.update({
            where: { id: productId },
            data,
        });
        return this.prismaService.product.findUnique({ where: { id: productId } });
    }
    async delete(id) {
        this.getById(id);
        await this.prismaService.product.delete({ where: { id } });
        return true;
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nlp_service_1.NlpService,
        file_service_1.FileService,
        prisma_service_1.PrismaService,
        recommendation_service_1.RecommendationService])
], ProductService);
//# sourceMappingURL=product.service.js.map