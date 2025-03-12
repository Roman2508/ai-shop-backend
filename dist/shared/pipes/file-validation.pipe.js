"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const file_util_1 = require("../utils/file.util");
const MAX_FILE_SIZE_MB = 10;
let FileValidationPipe = class FileValidationPipe {
    async transform(value, metadata) {
        console.log(metadata);
        if (!value.filename) {
            throw new common_1.BadRequestException('Файл не загружен');
        }
        const { filename, createReadStream } = value;
        const fileStream = createReadStream();
        const allowedFormats = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
        const isFileFormatValid = (0, file_util_1.validateFileFormat)(filename, allowedFormats);
        if (!isFileFormatValid) {
            throw new common_1.BadRequestException('Формат файла не підтримується');
        }
        const isFileSizeValid = await (0, file_util_1.validateFileSize)(fileStream, MAX_FILE_SIZE_MB * 1024 * 1024);
        if (!isFileSizeValid) {
            throw new common_1.BadRequestException('Розмір файла перевищує 10 МБ');
        }
        return value;
    }
};
exports.FileValidationPipe = FileValidationPipe;
exports.FileValidationPipe = FileValidationPipe = __decorate([
    (0, common_1.Injectable)()
], FileValidationPipe);
//# sourceMappingURL=file-validation.pipe.js.map