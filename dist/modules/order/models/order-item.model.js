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
exports.OrderItemModel = void 0;
const graphql_1 = require("@nestjs/graphql");
const order_model_1 = require("./order.model");
const product_model_1 = require("../../product/models/product.model");
let OrderItemModel = class OrderItemModel {
};
exports.OrderItemModel = OrderItemModel;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], OrderItemModel.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], OrderItemModel.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], OrderItemModel.prototype, "updatedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], OrderItemModel.prototype, "quantity", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], OrderItemModel.prototype, "price", void 0);
__decorate([
    (0, graphql_1.Field)(() => order_model_1.OrderModel),
    __metadata("design:type", order_model_1.OrderModel)
], OrderItemModel.prototype, "order", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], OrderItemModel.prototype, "orderId", void 0);
__decorate([
    (0, graphql_1.Field)(() => product_model_1.ProductModel),
    __metadata("design:type", product_model_1.ProductModel)
], OrderItemModel.prototype, "product", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], OrderItemModel.prototype, "productId", void 0);
exports.OrderItemModel = OrderItemModel = __decorate([
    (0, graphql_1.ObjectType)()
], OrderItemModel);
//# sourceMappingURL=order-item.model.js.map