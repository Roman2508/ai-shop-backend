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
exports.SessionService = void 0;
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../../../core/prisma/prisma.service");
const common_1 = require("@nestjs/common");
const argon2_1 = require("argon2");
let SessionService = class SessionService {
    constructor(prismaService, configService) {
        this.prismaService = prismaService;
        this.configService = configService;
    }
    async login(req, input) {
        const { login, password } = input;
        const user = await this.prismaService.user.findFirst({
            where: {
                OR: [{ username: { equals: login } }, { email: { equals: login } }],
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('Користувач не знайдений');
        }
        const isValidPassword = await (0, argon2_1.verify)(user.password, password);
        if (!isValidPassword) {
            throw new common_1.UnauthorizedException('Пароль не вірний');
        }
        return new Promise((resolve, reject) => {
            req.session.createdAt = new Date();
            req.session.userId = user.id;
            req.session.save((err) => {
                if (err) {
                    return reject(new common_1.InternalServerErrorException('Не вдалось зберегти сесію'));
                }
                resolve({ user });
            });
        });
    }
    async logout(req) {
        return new Promise((resolve, reject) => {
            req.session.destroy((err) => {
                if (err) {
                    return reject(new common_1.InternalServerErrorException('Не вдалось завершити сесію'));
                }
                const sessionName = this.configService.getOrThrow('SESSION_NAME');
                req.res.clearCookie(sessionName);
                resolve(true);
            });
        });
    }
};
exports.SessionService = SessionService;
exports.SessionService = SessionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], SessionService);
//# sourceMappingURL=session.service.js.map