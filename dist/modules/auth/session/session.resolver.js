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
exports.SessionResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const login_input_1 = require("./inputs/login.input");
const session_service_1 = require("./session.service");
const session_model_1 = require("./models/session.model");
const user_model_1 = require("../account/models/user.model");
const auth_decorator_1 = require("../../../shared/decorators/auth.decorator");
const user_agent_decorator_1 = require("../../../shared/decorators/user-agent-decorator");
let SessionResolver = class SessionResolver {
    constructor(sessionService) {
        this.sessionService = sessionService;
    }
    async findByUser({ req }) {
        return this.sessionService.findByUser(req);
    }
    async findCurrent({ req }) {
        return this.sessionService.findCurrent(req);
    }
    async login({ req }, input, userAgent) {
        return this.sessionService.login(req, input, userAgent);
    }
    async logout({ req }) {
        return this.sessionService.logout(req);
    }
    async clearSession({ req }) {
        return this.sessionService.clearSession(req);
    }
    async remove({ req }, id) {
        return this.sessionService.remove(req, id);
    }
};
exports.SessionResolver = SessionResolver;
__decorate([
    (0, auth_decorator_1.Authorization)(),
    (0, graphql_1.Query)(() => [session_model_1.SessionModel], { name: 'findSessionsByUser' }),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SessionResolver.prototype, "findByUser", null);
__decorate([
    (0, auth_decorator_1.Authorization)(),
    (0, graphql_1.Query)(() => session_model_1.SessionModel, { name: 'findCurrentSession' }),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SessionResolver.prototype, "findCurrent", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_model_1.UserModel, { name: 'loginUser' }),
    __param(0, (0, graphql_1.Context)()),
    __param(1, (0, graphql_1.Args)('data')),
    __param(2, (0, user_agent_decorator_1.UserAgent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, login_input_1.LoginInput, String]),
    __metadata("design:returntype", Promise)
], SessionResolver.prototype, "login", null);
__decorate([
    (0, auth_decorator_1.Authorization)(),
    (0, graphql_1.Mutation)(() => Boolean, { name: 'logoutUser' }),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SessionResolver.prototype, "logout", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, { name: 'clearSessionCookie' }),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SessionResolver.prototype, "clearSession", null);
__decorate([
    (0, auth_decorator_1.Authorization)(),
    (0, graphql_1.Mutation)(() => Boolean, { name: 'removeSession' }),
    __param(0, (0, graphql_1.Context)()),
    __param(1, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SessionResolver.prototype, "remove", null);
exports.SessionResolver = SessionResolver = __decorate([
    (0, graphql_1.Resolver)('Session'),
    __metadata("design:paramtypes", [session_service_1.SessionService])
], SessionResolver);
//# sourceMappingURL=session.resolver.js.map