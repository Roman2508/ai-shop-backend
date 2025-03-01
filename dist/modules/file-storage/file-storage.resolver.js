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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileStorageResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const file_storage_service_1 = require("./file-storage.service");
let FileStorageResolver = class FileStorageResolver {
    constructor(fileStorageService) {
        this.fileStorageService = fileStorageService;
    }
};
exports.FileStorageResolver = FileStorageResolver;
exports.FileStorageResolver = FileStorageResolver = __decorate([
    (0, graphql_1.Resolver)('FileStorage'),
    __metadata("design:paramtypes", [typeof (_a = typeof file_storage_service_1.FileStorageService !== "undefined" && file_storage_service_1.FileStorageService) === "function" ? _a : Object])
], FileStorageResolver);
//# sourceMappingURL=file-storage.resolver.js.map