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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const file_service_1 = require("./file.service");
const auth_decorator_1 = require("../../shared/decorators/auth.decorator");
const authorized_decorator_1 = require("../../shared/decorators/authorized.decorator");
const GraphQLUpload = require("graphql-upload/GraphQLUpload.js");
const Upload = require("graphql-upload/Upload.js");
let FileResolver = class FileResolver {
    constructor(fileService) {
        this.fileService = fileService;
    }
    async changeThumbnail(user, thumbnail) {
        return this.fileService.changeThumbnail(user, thumbnail);
    }
    async removeThumbnail(user) {
        return this.fileService.removeThumbnail(user);
    }
};
exports.FileResolver = FileResolver;
__decorate([
    (0, auth_decorator_1.Authorization)(),
    (0, graphql_1.Mutation)(() => Boolean, { name: 'changeStreamThumbnail' }),
    __param(0, (0, authorized_decorator_1.Authorized)()),
    __param(1, (0, graphql_1.Args)('thumbnail', { type: () => GraphQLUpload }, FileValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof Upload !== "undefined" && Upload) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], FileResolver.prototype, "changeThumbnail", null);
__decorate([
    (0, auth_decorator_1.Authorization)(),
    (0, graphql_1.Mutation)(() => Boolean, { name: 'removeStreamThumbnail' }),
    __param(0, (0, authorized_decorator_1.Authorized)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FileResolver.prototype, "removeThumbnail", null);
exports.FileResolver = FileResolver = __decorate([
    (0, graphql_1.Resolver)('File'),
    __metadata("design:paramtypes", [file_service_1.FileService])
], FileResolver);
//# sourceMappingURL=file.resolver.js.map