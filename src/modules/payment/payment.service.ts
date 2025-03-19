import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentService {
  async createPayment() {
    const fondyMerchantId = process.env.FONDY_MERCHANT_ID;
    const fondyPassword = process.env.FONDY_MERCHANT_PASSWORD;

    const dto = {
      name: 'testname',
      duration: 'duration',
      price: 1200,
    };

    const order_id = `name=${dto.name}//duration=${dto.duration}//price=${dto.price}//createdAt=${Date.now()}`;

    // const order_id = `name=${dto.name}//duration=${dto.duration}//price=${dto.price}//startAt=${dto.startAt}//student=${dto.student}//tutor=${dto.tutor}//createdAt=${Date.now()}`;

    // process.env.ALLOWED_ORIGIN
    const orderBody = {
      response_url: 'http://localhost:3000/', // маэ бути thank you page
      // server_callback_url: `${'process.env.NRGOK_FORWARDING'}/reserved-lessons/payment/confirmation`,
      // server_callback_url: `http://localhost:3000`,
      order_id: order_id,
      merchant_id: fondyMerchantId,
      order_desc: dto.name,
      amount: dto.price * 100,
      currency: 'UAH',
    };

    const orderKeys = Object.keys(orderBody).sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
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
    // window.location.href = response.checkout_url
    const data = await response.json();
    return data;
  }

  async confirmPayment(dto: any) {
    if (dto.order_status === 'approved') {
      const orderDataString = dto.order_id;

      const ordersFieldsArray = orderDataString.split('//').map((el) => {
        const substr = el.split('=');
        if (substr[0] === 'tutor' || substr[0] === 'student' || substr[0] === 'duration' || substr[0] === 'price') {
          return { [substr[0]]: Number(substr[1]) };
        } else {
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

      // const sameLessonExist = await this.reservedLessonsService.findByStartDate(orderData.tutor, orderData.startAt);

      // if (sameLessonExist) return dto;

      // return this.reservedLessonsService.create({
      //   ...orderData,
      //   theme: '',
      //   status: 'planned',
      // });
    }
    return dto;
  }
}
