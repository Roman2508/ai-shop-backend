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
exports.OrderItemDto = exports.CreateOrderInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_transformer_1 = require("class-transformer");
const generated_1 = require("../../../../prisma/generated/index.js");
const class_validator_1 = require("class-validator");
let CreateOrderInput = class CreateOrderInput {
};
exports.CreateOrderInput = CreateOrderInput;
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(generated_1.EnumOrderStatus, { message: 'Статус замовлення оновлено' }),
    __metadata("design:type", String)
], CreateOrderInput.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => [OrderItemDto]),
    (0, class_validator_1.IsArray)({ message: 'В замовленні немає ні одного товара' }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => OrderItemDto),
    __metadata("design:type", Array)
], CreateOrderInput.prototype, "items", void 0);
exports.CreateOrderInput = CreateOrderInput = __decorate([
    (0, graphql_1.InputType)()
], CreateOrderInput);
let OrderItemDto = class OrderItemDto {
};
exports.OrderItemDto = OrderItemDto;
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, class_validator_1.IsNumber)({}, { message: 'Кількість повинна бути числом' }),
    __metadata("design:type", Number)
], OrderItemDto.prototype, "quantity", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, class_validator_1.IsNumber)({}, { message: 'Ціна повинна бути числом' }),
    __metadata("design:type", Number)
], OrderItemDto.prototype, "price", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrderItemDto.prototype, "productId", void 0);
exports.OrderItemDto = OrderItemDto = __decorate([
    (0, graphql_1.InputType)()
], OrderItemDto);
//# sourceMappingURL=create-order.input.js.map