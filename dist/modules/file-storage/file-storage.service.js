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
exports.StorageService = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let StorageService = class StorageService {
    constructor(configService) {
        this.configService = configService;
        this.client = new client_s3_1.S3Client({
            endpoint: this.configService.getOrThrow('S3_ENDPOINT'),
            region: this.configService.getOrThrow('S3_REGION'),
            credentials: {
                accessKeyId: this.configService.getOrThrow('S3_ACCESS_KEY_ID'),
                secretAccessKey: this.configService.getOrThrow('S3_SECRET_ACCESS_KEY'),
            },
        });
        this.bucket = this.configService.getOrThrow('S3_BUCKET_NAME');
    }
    async upload(buffer, key, mimetype) {
        const command = {
            Bucket: this.bucket,
            Key: String(key),
            Body: buffer,
            ContentType: mimetype,
        };
        try {
            await this.client.send(new client_s3_1.PutObjectCommand(command));
        }
        catch (error) {
            throw error;
        }
    }
    async remove(key) {
        const command = {
            Bucket: this.bucket,
            Key: String(key),
        };
        try {
            await this.client.send(new client_s3_1.DeleteObjectCommand(command));
        }
        catch (error) {
            throw error;
        }
    }
};
exports.StorageService = StorageService;
exports.StorageService = StorageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], StorageService);
//# sourceMappingURL=file-storage.service.js.map