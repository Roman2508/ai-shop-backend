import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { NlpService } from './../nlp/nlp.service';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateProductInput } from './inputs/create-product.input';
import { UpdateProductInput } from './inputs/update-product.input';

@Injectable()
export class ProductService {
  constructor(
    private readonly nlpService: NlpService,
    private readonly prismaService: PrismaService,
  ) {}

  async getAll() {
    return this.prismaService.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getById(id: string) {
    const product = await this.prismaService.product.findUnique({
      where: { id },
      include: {
        reviews: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!product) throw new NotFoundException('Товар не знайдено');

    return product;
  }

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

  async getMostPopular() {
    const mostPopularProducts = await this.prismaService.orderItem.groupBy({
      by: ['productId'],
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
    });

    const productIds = mostPopularProducts.map((item) => item.productId);

    const products = await this.prismaService.product.findMany({
      where: { id: { in: productIds } },
    });

    return products;
  }

  /* FAISS */
  async getSimilar(id: string) {
    const currentProduct = await this.getById(id);

    if (!currentProduct) throw new NotFoundException('Поточний товар не знайдений');

    const products = await this.prismaService.product.findMany({
      where: {
        title: currentProduct.title,
        NOT: { id: currentProduct.id },
      },
      orderBy: { createdAt: 'desc' },
    });

    return products;
  }

  async create(input: CreateProductInput) {
    await this.prismaService.product.create({ data: input });
    return true;
  }

  async update(input: UpdateProductInput) {
    const { productId, ...data } = input;
    await this.prismaService.product.update({
      where: { id: productId },
      data,
    });
    return true;
  }

  async delete(id: string) {
    this.getById(id);
    return this.prismaService.product.delete({ where: { id } });
  }
}
