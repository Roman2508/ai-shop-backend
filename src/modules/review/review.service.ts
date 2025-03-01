import { Injectable, NotFoundException } from '@nestjs/common';

import { ProductService } from '../product/product.service';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateReviewInput } from './inputs/create-review.input';

@Injectable()
export class ReviewService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly productService: ProductService,
  ) {}

  async create(userId: string, input: CreateReviewInput) {
    const { productId, ...data } = input;
    await this.productService.getById(productId);

    return this.prismaService.review.create({
      data: {
        ...data,
        product: { connect: { id: productId } },
        user: { connect: { id: userId } },
      },
    });
  }

  async delete(userId: string, id: string) {
    const review = await this.prismaService.review.findUnique({
      where: { id, userId },
      include: { user: true },
    });

    if (!review) throw new NotFoundException('Відгук не знайдено або ви не є його автором');
    return this.prismaService.review.delete({ where: { id } });
  }
}
