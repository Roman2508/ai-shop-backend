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
exports.FavoriteItemModel = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_model_1 = require("./user.model");
const product_model_1 = require("../../../product/models/product.model");
let FavoriteItemModel = class FavoriteItemModel {
};
exports.FavoriteItemModel = FavoriteItemModel;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], FavoriteItemModel.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_model_1.UserModel),
    __metadata("design:type", user_model_1.UserModel)
], FavoriteItemModel.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], FavoriteItemModel.prototype, "userId", void 0);
__decorate([
    (0, graphql_1.Field)(() => product_model_1.ProductModel),
    __metadata("design:type", product_model_1.ProductModel)
], FavoriteItemModel.prototype, "product", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], FavoriteItemModel.prototype, "productId", void 0);
exports.FavoriteItemModel = FavoriteItemModel = __decorate([
    (0, graphql_1.ObjectType)()
], FavoriteItemModel);
//# sourceMappingURL=favorite-item.model.js.map