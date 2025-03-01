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
exports.UploadFileInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const graphql_upload_1 = require("graphql-upload");
let UploadFileInput = class UploadFileInput {
};
exports.UploadFileInput = UploadFileInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_upload_1.GraphQLUpload),
    __metadata("design:type", Promise)
], UploadFileInput.prototype, "file", void 0);
exports.UploadFileInput = UploadFileInput = __decorate([
    (0, graphql_1.InputType)()
], UploadFileInput);
//# sourceMappingURL=upload-file.input.js.map