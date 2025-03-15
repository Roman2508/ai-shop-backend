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
exports.CartItemModel = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_model_1 = require("./user.model");
const product_model_1 = require("../../../product/models/product.model");
let CartItemModel = class CartItemModel {
};
exports.CartItemModel = CartItemModel;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], CartItemModel.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], CartItemModel.prototype, "count", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_model_1.UserModel),
    __metadata("design:type", user_model_1.UserModel)
], CartItemModel.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CartItemModel.prototype, "userId", void 0);
__decorate([
    (0, graphql_1.Field)(() => product_model_1.ProductModel),
    __metadata("design:type", product_model_1.ProductModel)
], CartItemModel.prototype, "product", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CartItemModel.prototype, "productId", void 0);
exports.CartItemModel = CartItemModel = __decorate([
    (0, graphql_1.ObjectType)()
], CartItemModel);
//# sourceMappingURL=cart-item.model.js.map