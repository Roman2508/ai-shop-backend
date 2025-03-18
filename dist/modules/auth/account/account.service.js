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
exports.AccountService = void 0;
const argon2_1 = require("argon2");
const common_1 = require("@nestjs/common");
const file_service_1 = require("../../file/file.service");
const prisma_service_1 = require("../../../core/prisma/prisma.service");
let AccountService = class AccountService {
    constructor(prismaService, fileService) {
        this.prismaService = prismaService;
        this.fileService = fileService;
    }
    async findAll() {
        const users = await this.prismaService.user.findMany();
        return users;
    }
    async me(id) {
        const user = await this.prismaService.user.findUnique({
            where: { id },
            include: {
                cart: { include: { product: true } },
                favorites: { include: { product: true } },
                reviews: { include: { product: true, user: true } },
                orders: true,
            },
        });
        return user;
    }
    async create(input) {
        const { email, password, username } = input;
        const isUsernameExist = await this.prismaService.user.findUnique({ where: { username } });
        if (isUsernameExist) {
            throw new common_1.ConflictException("Це ім'я вже зайнято");
        }
        const isEmailExist = await this.prismaService.user.findUnique({ where: { email } });
        if (isEmailExist) {
            throw new common_1.ConflictException('Ця пошта вже зареєстрована');
        }
        await this.prismaService.user.create({
            data: { email, username, password: await (0, argon2_1.hash)(password), displayName: username },
        });
        return true;
    }
    async changeEmail(user, input) {
        const { email } = input;
        await this.prismaService.user.update({
            where: { id: user.id },
            data: { email },
        });
        return true;
    }
    async changePassword(user, input) {
        const { oldPassword, newPassword } = input;
        const isValidPassword = await (0, argon2_1.verify)(user.password, oldPassword);
        if (!isValidPassword) {
            throw new common_1.UnauthorizedException('Паролі не співпадають');
        }
        await this.prismaService.user.update({
            where: { id: user.id },
            data: { password: await (0, argon2_1.hash)(newPassword) },
        });
        return true;
    }
    async toggleCart(userId, input) {
        const user = await this.prismaService.user.findFirst({
            where: { id: userId },
            include: { cart: { include: { product: true } } },
        });
        if (!user) {
            throw new Error('Користувача не знайдено');
        }
        const isExists = user.cart.some((product) => product.productId === input.productId);
        if (!isExists) {
            await this.prismaService.cartItem.create({
                data: {
                    userId: userId,
                    productId: input.productId,
                    count: input.count,
                },
            });
        }
        else {
            await this.prismaService.cartItem.delete({
                where: {
                    userId_productId: {
                        userId: userId,
                        productId: input.productId,
                    },
                },
            });
        }
        return true;
    }
    async toggleFavorite(userId, productId) {
        const user = await this.prismaService.user.findUnique({
            where: { id: userId },
            include: { favorites: true },
        });
        if (!user) {
            throw new Error('Користувача не знайдено');
        }
        const isFavorite = user.favorites.some((favorite) => favorite.productId === productId);
        if (!isFavorite) {
            await this.prismaService.favoriteItem.create({
                data: {
                    userId: userId,
                    productId: productId,
                },
            });
        }
        else {
            await this.prismaService.favoriteItem.delete({
                where: {
                    userId_productId: {
                        userId: userId,
                        productId: productId,
                    },
                },
            });
        }
        return true;
    }
    async updateUserData(id, user) {
        const { password, ...data } = user;
        const passObj = password ? { password: await (0, argon2_1.hash)(password) } : {};
        await this.prismaService.user.update({
            where: { id },
            data: { ...data, ...passObj },
        });
        return true;
    }
    async uploadAvatar(id, file) {
        const user = await this.prismaService.user.findUnique({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException('Користувача не знайдено');
        }
        if (user.avatar) {
            await this.fileService.removeFile(user.avatar, 'users');
        }
        const filename = await this.fileService.upload(file, 'users');
        await this.prismaService.user.update({ where: { id }, data: { avatar: filename } });
        return true;
    }
    async changeCartItemCount(input) {
        await this.prismaService.cartItem.update({
            where: { id: input.id },
            data: { count: input.count },
        });
        return true;
    }
};
exports.AccountService = AccountService;
exports.AccountService = AccountService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        file_service_1.FileService])
], AccountService);
//# sourceMappingURL=account.service.js.map