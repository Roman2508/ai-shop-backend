import { Body, Controller, Get, Post, Res } from '@nestjs/common';

import { Response } from 'express';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { FondyCallbackResponseDto } from './dto/fondy-callback-response.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('/create')
  paymentHandler(@Body() dto: CreatePaymentDto) {
    return this.paymentService.createPayment(dto);
  }

  @Post('/confirmation')
  async paymentConfirmation(@Body() dto: FondyCallbackResponseDto) {
    return this.paymentService.confirmPayment(dto);
  }

  @Get('cookie')
  testCookie(@Res() res: Response) {
    res.setHeader('Set-Cookie', 'test_cookie=value; Path=/; Secure; SameSite=None');
    res.send('Кука отправлена');
  }
}
