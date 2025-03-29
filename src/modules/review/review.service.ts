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

  async getByUserId(userId: string) {
    const reviews = await this.prismaService.review.findMany({
      where: { userId },
      include: { product: true, user: true },
    });
    return reviews;
  }

  async getAverage() {
    const reviews = await this.prismaService.review.findMany();
    const totalRating = reviews.reduce((acc, cur) => acc + cur.rating, 0);
    const reviewsCount = reviews.length;
    const avgRating = totalRating / reviewsCount;
    return avgRating.toFixed(2);
  }

  async create(userId: string, input: CreateReviewInput) {
    const { productId, ...data } = input;
    await this.productService.getById(productId);

    await this.prismaService.review.create({
      data: {
        ...data,
        product: { connect: { id: productId } },
        user: { connect: { id: userId } },
      },
    });

    return true;
  }

  async delete(userId: string, id: string) {
    const review = await this.prismaService.review.findUnique({
      where: { id, userId },
      include: { user: true },
    });

    if (!review) throw new NotFoundException('Відгук не знайдено або ви не є його автором');
    await this.prismaService.review.delete({ where: { id } });

    return true;
  }
}
