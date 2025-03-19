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
exports.PaymentResponseModel = exports.PaymentModel = void 0;
const graphql_1 = require("@nestjs/graphql");
let PaymentModel = class PaymentModel {
};
exports.PaymentModel = PaymentModel;
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], PaymentModel.prototype, "checkout_url", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], PaymentModel.prototype, "payment_id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], PaymentModel.prototype, "response_status", void 0);
exports.PaymentModel = PaymentModel = __decorate([
    (0, graphql_1.ObjectType)()
], PaymentModel);
let PaymentResponseModel = class PaymentResponseModel {
};
exports.PaymentResponseModel = PaymentResponseModel;
__decorate([
    (0, graphql_1.Field)(() => PaymentModel),
    __metadata("design:type", PaymentModel)
], PaymentResponseModel.prototype, "response", void 0);
exports.PaymentResponseModel = PaymentResponseModel = __decorate([
    (0, graphql_1.ObjectType)()
], PaymentResponseModel);
//# sourceMappingURL=payment-response.model.js.map