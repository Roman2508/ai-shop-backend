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
exports.LangchainController = void 0;
const common_1 = require("@nestjs/common");
const langchain_service_1 = require("./langchain.service");
const create_langchain_dto_1 = require("./dto/create-langchain.dto");
const update_langchain_dto_1 = require("./dto/update-langchain.dto");
let LangchainController = class LangchainController {
    constructor(langchainService) {
        this.langchainService = langchainService;
    }
    create(createLangchainDto) {
        return this.langchainService.create(createLangchainDto);
    }
    findAll() {
        return this.langchainService.findAll();
    }
    findOne(id) {
        return this.langchainService.findOne(+id);
    }
    update(id, updateLangchainDto) {
        return this.langchainService.update(+id, updateLangchainDto);
    }
    remove(id) {
        return this.langchainService.remove(+id);
    }
};
exports.LangchainController = LangchainController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_langchain_dto_1.CreateLangchainDto]),
    __metadata("design:returntype", void 0)
], LangchainController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LangchainController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LangchainController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_langchain_dto_1.UpdateLangchainDto]),
    __metadata("design:returntype", void 0)
], LangchainController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LangchainController.prototype, "remove", null);
exports.LangchainController = LangchainController = __decorate([
    (0, common_1.Controller)('langchain'),
    __metadata("design:paramtypes", [langchain_service_1.LangchainService])
], LangchainController);
//# sourceMappingURL=langchain.controller.js.map