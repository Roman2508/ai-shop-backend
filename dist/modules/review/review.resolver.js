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
exports.ReviewResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const review_service_1 = require("./review.service");
const create_review_input_1 = require("./inputs/create-review.input");
const auth_decorator_1 = require("../../shared/decorators/auth.decorator");
const authorized_decorator_1 = require("../../shared/decorators/authorized.decorator");
let ReviewResolver = class ReviewResolver {
    constructor(reviewService) {
        this.reviewService = reviewService;
    }
    async create(userId, input) {
        return this.reviewService.create(userId, input);
    }
    async delete(userId, id) {
        return this.reviewService.delete(userId, id);
    }
};
exports.ReviewResolver = ReviewResolver;
__decorate([
    (0, auth_decorator_1.Authorization)(),
    (0, graphql_1.Mutation)(() => Boolean, { name: 'createReview' }),
    __param(0, (0, authorized_decorator_1.Authorized)('id')),
    __param(1, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_review_input_1.CreateReviewInput]),
    __metadata("design:returntype", Promise)
], ReviewResolver.prototype, "create", null);
__decorate([
    (0, auth_decorator_1.Authorization)(),
    (0, graphql_1.Mutation)(() => Boolean, { name: 'deleteReview' }),
    __param(0, (0, authorized_decorator_1.Authorized)('id')),
    __param(1, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ReviewResolver.prototype, "delete", null);
exports.ReviewResolver = ReviewResolver = __decorate([
    (0, graphql_1.Resolver)('Review'),
    __metadata("design:paramtypes", [review_service_1.ReviewService])
], ReviewResolver);
//# sourceMappingURL=review.resolver.js.map