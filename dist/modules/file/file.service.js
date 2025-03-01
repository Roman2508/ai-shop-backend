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
exports.FileService = void 0;
const path = require('path');
const common_1 = require("@nestjs/common");
let FileService = class FileService {
    constructor(storageService) {
        this.storageService = storageService;
    }
    async changeThumbnail(user, file) {
        const stream = await this.findByUserId(user);
        if (stream.thumbnailUrl) {
            await this.storageService.remove(stream.thumbnailUrl);
        }
        const chunks = [];
        for await (const chunk of file.createReadStream()) {
            chunks.push(chunk);
        }
        const buffer = Buffer.concat(chunks);
        const fileName = `/streams/${user.username}.webp`;
        if (file.filename && file.filename.endsWith('.gif')) {
            const processedBuffer = await sharp(buffer, { animated: true }).resize(1280, 720).webp().toBuffer();
            await this.storageService.upload(processedBuffer, fileName, 'image/webp');
        }
        else {
            const processedBuffer = await sharp(buffer).resize(1280, 720).webp().toBuffer();
            await this.storageService.upload(processedBuffer, fileName, 'image/webp');
        }
        await this.prismaService.stream.update({
            where: {
                userId: user.id,
            },
            data: {
                thumbnailUrl: fileName,
            },
        });
        return true;
    }
    async removeThumbnail(user) {
        const stream = await this.findByUserId(user);
        if (!stream.thumbnailUrl) {
            return;
        }
        await this.storageService.remove(stream.thumbnailUrl);
        await this.prismaService.stream.update({
            where: {
                userId: user.id,
            },
            data: {
                thumbnailUrl: null,
            },
        });
        return true;
    }
};
exports.FileService = FileService;
exports.FileService = FileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], FileService);
//# sourceMappingURL=file.service.js.map