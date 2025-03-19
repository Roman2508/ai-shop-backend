"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const crypto = require("crypto");
const common_1 = require("@nestjs/common");
let PaymentService = class PaymentService {
    async createPayment() {
        const fondyMerchantId = process.env.FONDY_MERCHANT_ID;
        const fondyPassword = process.env.FONDY_MERCHANT_PASSWORD;
        const dto = {
            name: 'testname',
            duration: 'duration',
            price: 1200,
        };
        const order_id = `name=${dto.name}//duration=${dto.duration}//price=${dto.price}//createdAt=${Date.now()}`;
        const orderBody = {
            response_url: 'http://localhost:3000/',
            order_id: order_id,
            merchant_id: fondyMerchantId,
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
        signature.update(`${fondyPassword}|${signatureRaw}`);
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
    async confirmPayment(dto) {
        if (dto.order_status === 'approved') {
            const orderDataString = dto.order_id;
            const ordersFieldsArray = orderDataString.split('//').map((el) => {
                const substr = el.split('=');
                if (substr[0] === 'tutor' || substr[0] === 'student' || substr[0] === 'duration' || substr[0] === 'price') {
                    return { [substr[0]]: Number(substr[1]) };
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
            }, {});
        }
        return dto;
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)()
], PaymentService);
//# sourceMappingURL=payment.service.js.map