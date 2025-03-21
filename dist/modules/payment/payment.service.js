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
exports.PaymentService = void 0;
const crypto = require("crypto");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const order_service_1 = require("../order/order.service");
const account_service_1 = require("../auth/account/account.service");
let PaymentService = class PaymentService {
    constructor(orderService, configService, accountService) {
        this.orderService = orderService;
        this.configService = configService;
        this.accountService = accountService;
    }
    async createPayment(dto) {
        const FONDY_MERCHANT_ID = this.configService.getOrThrow('FONDY_MERCHANT_ID');
        const FONDY_MARCHANT_PASSWORD = this.configService.getOrThrow('FONDY_MERCHANT_PASSWORD');
        const FRONTEND_URL = this.configService.getOrThrow('FRONTEND_URL');
        const NGROCK_FORWARDING_URL = this.configService.getOrThrow('NGROCK_FORWARDING_URL');
        const ENVIRONMENT = this.configService.getOrThrow('NODE_ENV');
        const BASE_URL = ENVIRONMENT === 'development' ? NGROCK_FORWARDING_URL : FRONTEND_URL;
        const orderedItemsString = JSON.stringify(dto.items);
        const order_id = `name=${dto.name}//price=${dto.price}//userId=${dto.userId}//items=${orderedItemsString}//createdAt=${Date.now()}`;
        const orderBody = {
            response_url: `${FRONTEND_URL}/checkout/thank-you`,
            server_callback_url: `${BASE_URL}/payment/confirmation`,
            order_id: order_id,
            merchant_id: FONDY_MERCHANT_ID,
            order_desc: dto.name,
            amount: dto.price * 100,
            currency: 'UAH',
        };
        const orderKeys = Object.keys(orderBody).sort((a, b) => {
            if (a < b)
                return -1;
            if (a > b)
                return 1;
            return 0;
        });
        const signatureRaw = orderKeys.map((v) => orderBody[v]).join('|');
        const signature = crypto.createHash('sha1');
        signature.update(`${FONDY_MARCHANT_PASSWORD}|${signatureRaw}`);
        const json = JSON.stringify({
            request: {
                ...orderBody,
                signature: signature.digest('hex'),
            },
        });
        const response = await fetch('https://pay.fondy.eu/api/checkout/url/', {
            body: json,
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        });
        const data = await response.json();
        return data;
    }
    checkSignature(dto) {
        const FONDY_MARCHANT_PASSWORD = this.configService.getOrThrow('FONDY_MERCHANT_PASSWORD');
        const orderedKeys = Object.keys(dto).sort((a, b) => {
            if (a < b)
                return -1;
            if (a > b)
                return 1;
            return 0;
        });
        const signatureValues = orderedKeys.filter((key) => dto[key] !== '' && dto[key] !== dto.response_signature_string && dto[key] !== dto.signature);
        const signatureRaw = signatureValues.map((v) => dto[v]).join('|');
        const signature = crypto.createHash('sha1');
        signature.update(`${FONDY_MARCHANT_PASSWORD}|${signatureRaw}`);
        const signatureHex = signature.digest('hex');
        if (signatureHex === dto.signature) {
            return true;
        }
        return false;
    }
    async confirmPayment(dto) {
        try {
            const isCurrentPayment = this.checkSignature(dto);
            if (dto.order_status === 'approved' && isCurrentPayment) {
                const orderDataString = dto.order_id;
                const ordersFieldsArray = orderDataString.split('//').map((el) => {
                    const substr = el.split('=');
                    if (substr[0] === 'price') {
                        return { [substr[0]]: Number(substr[1]) };
                    }
                    else if (substr[0] === 'items') {
                        return { [substr[0]]: JSON.parse(substr[1]) };
                    }
                    else {
                        return { [substr[0]]: substr[1] };
                    }
                });
                const orderData = ordersFieldsArray.reduce((obj, item) => {
                    const key = Object.keys(item)[0];
                    if (key && typeof item[key] !== 'undefined') {
                        obj[key] = item[key];
                    }
                    return obj;
                }, { name: '', userId: '', price: 0, items: [] });
                const { userId, items } = orderData;
                const isOrderExist = await this.orderService.checkIsExist(dto.order_id);
                console.log('isOrderExist:', isOrderExist);
                if (!isOrderExist) {
                    const order = await this.orderService.create({ userId, orderId: dto.order_id, items });
                    await Promise.all(items.map(async (el) => {
                        await this.accountService.toggleCart(userId, { productId: el.productId, count: el.quantity });
                    }));
                    return order;
                }
            }
        }
        catch (error) {
            throw new Error('Сталась помилка з платіжним сервісом. Спробуйте пізніше');
        }
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [order_service_1.OrderService,
        config_1.ConfigService,
        account_service_1.AccountService])
], PaymentService);
//# sourceMappingURL=payment.service.js.map