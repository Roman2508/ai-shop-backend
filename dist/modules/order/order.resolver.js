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
exports.OrderResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const order_service_1 = require("./order.service");
const create_order_input_1 = require("./inputs/create-order.input");
const auth_decorator_1 = require("../../shared/decorators/auth.decorator");
const authorized_decorator_1 = require("../../shared/decorators/authorized.decorator");
let OrderResolver = class OrderResolver {
    constructor(orderService) {
        this.orderService = orderService;
    }
    async createPayment(userId, input) {
        return this.orderService.createPayment(input, userId);
    }
    async updateStatus() {
        return this.orderService.updateStatus();
    }
};
exports.OrderResolver = OrderResolver;
__decorate([
    (0, auth_decorator_1.Authorization)(),
    (0, graphql_1.Mutation)(() => Boolean, { name: 'createPayment' }),
    __param(0, (0, authorized_decorator_1.Authorized)('id')),
    __param(1, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_order_input_1.CreateOrderInput]),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "createPayment", null);
__decorate([
    (0, auth_decorator_1.Authorization)(),
    (0, graphql_1.Mutation)(() => Boolean, { name: 'updateStatus' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "updateStatus", null);
exports.OrderResolver = OrderResolver = __decorate([
    (0, graphql_1.Resolver)('Order'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderResolver);
//# sourceMappingURL=order.resolver.js.map