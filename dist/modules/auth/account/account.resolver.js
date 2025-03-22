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
exports.AccountResolver = void 0;
const GraphQLUpload = require("graphql-upload/GraphQLUpload.js");
const graphql_1 = require("@nestjs/graphql");
const user_model_1 = require("./models/user.model");
const account_service_1 = require("./account.service");
const update_user_input_1 = require("./inputs/update-user.input");
const create_user_input_1 = require("./inputs/create-user.input");
const change_email_input_1 = require("./inputs/change-email.input");
const auth_decorator_1 = require("../../../shared/decorators/auth.decorator");
const change_password_input_1 = require("./inputs/change-password.input");
const authorized_decorator_1 = require("../../../shared/decorators/authorized.decorator");
const add_to_cart_input_1 = require("./inputs/add-to-cart.input");
const change_cart_item_count_input_1 = require("./inputs/change-cart-item-count.input");
const update_role_input_1 = require("./inputs/update-role-input");
let AccountResolver = class AccountResolver {
    constructor(accountService) {
        this.accountService = accountService;
    }
    async findAll() {
        return this.accountService.findAll();
    }
    async me(id) {
        return this.accountService.me(id);
    }
    async create(input) {
        return this.accountService.create(input);
    }
    async changeEmail(user, input) {
        return this.accountService.changeEmail(user, input);
    }
    async changePassword(user, input) {
        return this.accountService.changePassword(user, input);
    }
    async toggleCart(id, input) {
        return this.accountService.toggleCart(id, input);
    }
    async toggleFavorite(id, productId) {
        return this.accountService.toggleFavorite(id, productId);
    }
    async updateUserData(id, input) {
        return this.accountService.updateUserData(id, input);
    }
    async updateRole(id, input) {
        return this.accountService.updateRole(id, input);
    }
    async uploadAvatar(userId, file) {
        return this.accountService.uploadAvatar(userId, file);
    }
    async changeCartItemCount(input) {
        return this.accountService.changeCartItemCount(input);
    }
};
exports.AccountResolver = AccountResolver;
__decorate([
    (0, graphql_1.Query)(() => [user_model_1.UserModel], { name: 'findAllUsers' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AccountResolver.prototype, "findAll", null);
__decorate([
    (0, auth_decorator_1.Authorization)(),
    (0, graphql_1.Query)(() => user_model_1.UserModel, { name: 'findProfile' }),
    __param(0, (0, authorized_decorator_1.Authorized)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AccountResolver.prototype, "me", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, { name: 'createUser' }),
    __param(0, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_input_1.CreateUserInput]),
    __metadata("design:returntype", Promise)
], AccountResolver.prototype, "create", null);
__decorate([
    (0, auth_decorator_1.Authorization)(),
    (0, graphql_1.Mutation)(() => Boolean, { name: 'changeEmail' }),
    __param(0, (0, authorized_decorator_1.Authorized)()),
    __param(1, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, change_email_input_1.ChangeEmailInput]),
    __metadata("design:returntype", Promise)
], AccountResolver.prototype, "changeEmail", null);
__decorate([
    (0, auth_decorator_1.Authorization)(),
    (0, graphql_1.Mutation)(() => Boolean, { name: 'changePassword' }),
    __param(0, (0, authorized_decorator_1.Authorized)()),
    __param(1, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, change_password_input_1.ChangePasswordInput]),
    __metadata("design:returntype", Promise)
], AccountResolver.prototype, "changePassword", null);
__decorate([
    (0, auth_decorator_1.Authorization)(),
    (0, graphql_1.Mutation)(() => Boolean, { name: 'toggleCart' }),
    __param(0, (0, authorized_decorator_1.Authorized)('id')),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, add_to_cart_input_1.AddToCartInput]),
    __metadata("design:returntype", Promise)
], AccountResolver.prototype, "toggleCart", null);
__decorate([
    (0, auth_decorator_1.Authorization)(),
    (0, graphql_1.Mutation)(() => Boolean, { name: 'toggleFavorite' }),
    __param(0, (0, authorized_decorator_1.Authorized)('id')),
    __param(1, (0, graphql_1.Args)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AccountResolver.prototype, "toggleFavorite", null);
__decorate([
    (0, auth_decorator_1.Authorization)(),
    (0, graphql_1.Mutation)(() => Boolean, { name: 'updateUserData' }),
    __param(0, (0, authorized_decorator_1.Authorized)('id')),
    __param(1, (0, graphql_1.Args)('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_input_1.UpdateUserInput]),
    __metadata("design:returntype", Promise)
], AccountResolver.prototype, "updateUserData", null);
__decorate([
    (0, auth_decorator_1.Authorization)(),
    (0, graphql_1.Mutation)(() => Boolean, { name: 'updateUserRole' }),
    __param(0, (0, authorized_decorator_1.Authorized)('id')),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_role_input_1.UpdateRoleInput]),
    __metadata("design:returntype", Promise)
], AccountResolver.prototype, "updateRole", null);
__decorate([
    (0, auth_decorator_1.Authorization)(),
    (0, graphql_1.Mutation)(() => Boolean, { name: 'uploadAvatar' }),
    __param(0, (0, authorized_decorator_1.Authorized)('id')),
    __param(1, (0, graphql_1.Args)({ name: 'file', type: () => GraphQLUpload })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AccountResolver.prototype, "uploadAvatar", null);
__decorate([
    (0, auth_decorator_1.Authorization)(),
    (0, graphql_1.Mutation)(() => Boolean, { name: 'changeCartItemCount' }),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [change_cart_item_count_input_1.ChangeCartItemCountInput]),
    __metadata("design:returntype", Promise)
], AccountResolver.prototype, "changeCartItemCount", null);
exports.AccountResolver = AccountResolver = __decorate([
    (0, graphql_1.Resolver)('Account'),
    __metadata("design:paramtypes", [account_service_1.AccountService])
], AccountResolver);
//# sourceMappingURL=account.resolver.js.map