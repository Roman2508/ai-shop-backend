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
exports.CreateProductInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let CreateProductInput = class CreateProductInput {
};
exports.CreateProductInput = CreateProductInput;
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsString)({ message: 'Це поле не може бути пустим' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateProductInput.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Це поле не може бути пустим' }),
    __metadata("design:type", Number)
], CreateProductInput.prototype, "price", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String]),
    (0, class_validator_1.IsString)({ message: 'Вкажіть хоча б одне фото', each: true }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Це поле не може бути пустим' }),
    __metadata("design:type", Array)
], CreateProductInput.prototype, "images", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Це поле не може бути пустим' }),
    __metadata("design:type", Number)
], CreateProductInput.prototype, "ram", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Це поле не може бути пустим' }),
    __metadata("design:type", Number)
], CreateProductInput.prototype, "builtInMemory", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Це поле не може бути пустим' }),
    __metadata("design:type", String)
], CreateProductInput.prototype, "color", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Це поле не може бути пустим' }),
    __metadata("design:type", Number)
], CreateProductInput.prototype, "frontCamera", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Це поле не може бути пустим' }),
    __metadata("design:type", Number)
], CreateProductInput.prototype, "mainCamera", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Це поле не може бути пустим' }),
    __metadata("design:type", Number)
], CreateProductInput.prototype, "screenDiagonal", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Це поле не може бути пустим' }),
    __metadata("design:type", Number)
], CreateProductInput.prototype, "simCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String]),
    (0, class_validator_1.IsString)({ message: 'Вкажіть хоча б один формат' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Це поле не може бути пустим', each: true }),
    __metadata("design:type", Array)
], CreateProductInput.prototype, "simFormat", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Це поле не може бути пустим' }),
    __metadata("design:type", String)
], CreateProductInput.prototype, "os", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Це поле не може бути пустим' }),
    __metadata("design:type", String)
], CreateProductInput.prototype, "processorName", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Це поле не може бути пустим' }),
    __metadata("design:type", String)
], CreateProductInput.prototype, "processorCores", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Це поле не може бути пустим' }),
    __metadata("design:type", Number)
], CreateProductInput.prototype, "battery", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Це поле не може бути пустим' }),
    __metadata("design:type", String)
], CreateProductInput.prototype, "materials", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Це поле не може бути пустим' }),
    __metadata("design:type", String)
], CreateProductInput.prototype, "deliverySet", void 0);
exports.CreateProductInput = CreateProductInput = __decorate([
    (0, graphql_1.InputType)()
], CreateProductInput);
//# sourceMappingURL=create-product.input.js.map