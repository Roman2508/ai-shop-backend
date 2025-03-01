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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const product_service_1 = require("./product.service");
const product_model_1 = require("./models/product.model");
const create_product_input_1 = require("./inputs/create-product.input");
const update_product_input_1 = require("./inputs/update-product.input");
const auth_decorator_1 = require("../../shared/decorators/auth.decorator");
let ProductResolver = class ProductResolver {
    constructor(productService) {
        this.productService = productService;
    }
    async getAll() {
        return this.productService.getAll();
    }
    async getById(productId) {
        return this.productService.getById(productId);
    }
    async search(input) {
        return this.productService.search(input);
    }
    async getMostPopular() {
        return this.productService.getMostPopular();
    }
    async getSimilar(productId) {
        return this.productService.getSimilar(productId);
    }
    async create(input) {
        return this.productService.create(input);
    }
    async update(input) {
        return this.productService.update(input);
    }
    async delete(productId) {
        return this.productService.delete(productId);
    }
};
exports.ProductResolver = ProductResolver;
__decorate([
    (0, graphql_1.Query)(() => [product_model_1.ProductModel], { name: 'getAllProducts' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "getAll", null);
__decorate([
    (0, graphql_1.Query)(() => product_model_1.ProductModel, { name: 'getProductById' }),
    __param(0, (0, graphql_1.Args)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "getById", null);
__decorate([
    (0, graphql_1.Query)(() => [product_model_1.ProductModel], { name: 'searchProduct' }),
    __param(0, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "search", null);
__decorate([
    (0, graphql_1.Query)(() => [product_model_1.ProductModel], { name: 'getMostPopularProducts' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "getMostPopular", null);
__decorate([
    (0, graphql_1.Query)(() => product_model_1.ProductModel, { name: 'getSimilarProducts' }),
    __param(0, (0, graphql_1.Args)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "getSimilar", null);
__decorate([
    (0, auth_decorator_1.Authorization)(),
    (0, graphql_1.Query)(() => product_model_1.ProductModel, { name: 'CreateProduct' }),
    __param(0, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_input_1.CreateProductInput]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "create", null);
__decorate([
    (0, auth_decorator_1.Authorization)(),
    (0, graphql_1.Query)(() => product_model_1.ProductModel, { name: 'UpdateProduct' }),
    __param(0, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_product_input_1.UpdateProductInput]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "update", null);
__decorate([
    (0, auth_decorator_1.Authorization)(),
    (0, graphql_1.Query)(() => product_model_1.ProductModel, { name: 'UpdateProduct' }),
    __param(0, (0, graphql_1.Args)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "delete", null);
exports.ProductResolver = ProductResolver = __decorate([
    (0, graphql_1.Resolver)('Product'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductResolver);
//# sourceMappingURL=product.resolver.js.map