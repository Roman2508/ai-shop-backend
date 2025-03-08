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
exports.PaginateAndFilterInput = void 0;
const graphql_1 = require("@nestjs/graphql");
let PaginateAndFilterInput = class PaginateAndFilterInput {
};
exports.PaginateAndFilterInput = PaginateAndFilterInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { defaultValue: 0, nullable: true }),
    __metadata("design:type", Number)
], PaginateAndFilterInput.prototype, "skip", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { defaultValue: 24, nullable: true }),
    __metadata("design:type", Number)
], PaginateAndFilterInput.prototype, "limit", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], PaginateAndFilterInput.prototype, "sortBy", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], PaginateAndFilterInput.prototype, "priceFrom", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], PaginateAndFilterInput.prototype, "priceTo", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], PaginateAndFilterInput.prototype, "brand", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], PaginateAndFilterInput.prototype, "ram", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], PaginateAndFilterInput.prototype, "builtInMemory", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], PaginateAndFilterInput.prototype, "color", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], PaginateAndFilterInput.prototype, "frontCamera", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], PaginateAndFilterInput.prototype, "mainCamera", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], PaginateAndFilterInput.prototype, "screenDiagonal", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], PaginateAndFilterInput.prototype, "simCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], PaginateAndFilterInput.prototype, "simFormat", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], PaginateAndFilterInput.prototype, "os", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], PaginateAndFilterInput.prototype, "processorName", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], PaginateAndFilterInput.prototype, "processorCores", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], PaginateAndFilterInput.prototype, "battery", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], PaginateAndFilterInput.prototype, "materials", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], PaginateAndFilterInput.prototype, "deliverySet", void 0);
exports.PaginateAndFilterInput = PaginateAndFilterInput = __decorate([
    (0, graphql_1.InputType)()
], PaginateAndFilterInput);
//# sourceMappingURL=paginate-and-filter.input.js.map