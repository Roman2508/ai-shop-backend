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
const prisma_service_1 = require("../../../core/prisma/prisma.service");
let AccountService = class AccountService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async findAll() {
        const users = await this.prismaService.user.findMany();
        return users;
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
};
exports.AccountService = AccountService;
exports.AccountService = AccountService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AccountService);
//# sourceMappingURL=account.service.js.map