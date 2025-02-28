import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { NlpService } from './../nlp/nlp.service';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly nlpService: NlpService,
    private readonly prismaService: PrismaService,
  ) {}

  async search(input: string) {
    const response = await this.nlpService.analyze(input);

    if (response.message !== 'success') {
      throw new BadRequestException('Помилка');
    }
    const queryObject = JSON.parse(response.text);
    console.log(queryObject);
    const products = await this.prismaService.product.findMany({ where: queryObject });

    if (!products.length) {
      throw new NotFoundException('Нічого не знайдено');
    }

    return products;
  }
}
