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
exports.UserModel = void 0;
const graphql_1 = require("@nestjs/graphql");
const cart_item_model_1 = require("./cart-item.model");
const generated_1 = require("../../../../../prisma/generated/index.js");
const favorite_item_model_1 = require("./favorite-item.model");
const order_model_1 = require("../../../order/models/order.model");
const review_model_1 = require("../../../review/models/review.model");
(0, graphql_1.registerEnumType)(generated_1.EnumUserRoles, {
    name: 'EnumUserRoles',
});
let UserModel = class UserModel {
};
exports.UserModel = UserModel;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], UserModel.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], UserModel.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], UserModel.prototype, "password", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], UserModel.prototype, "username", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], UserModel.prototype, "displayName", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], UserModel.prototype, "avatar", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], UserModel.prototype, "city", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], UserModel.prototype, "street", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], UserModel.prototype, "postOffice", void 0);
__decorate([
    (0, graphql_1.Field)(() => generated_1.EnumUserRoles),
    __metadata("design:type", String)
], UserModel.prototype, "role", void 0);
__decorate([
    (0, graphql_1.Field)(() => [favorite_item_model_1.FavoriteItemModel]),
    __metadata("design:type", Array)
], UserModel.prototype, "favorites", void 0);
__decorate([
    (0, graphql_1.Field)(() => [cart_item_model_1.CartItemModel]),
    __metadata("design:type", Array)
], UserModel.prototype, "cart", void 0);
__decorate([
    (0, graphql_1.Field)(() => [order_model_1.OrderModel]),
    __metadata("design:type", Array)
], UserModel.prototype, "orders", void 0);
__decorate([
    (0, graphql_1.Field)(() => [review_model_1.ReviewModel]),
    __metadata("design:type", Array)
], UserModel.prototype, "reviews", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], UserModel.prototype, "viewedProducts", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], UserModel.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], UserModel.prototype, "updatedAt", void 0);
exports.UserModel = UserModel = __decorate([
    (0, graphql_1.ObjectType)()
], UserModel);
//# sourceMappingURL=user.model.js.map