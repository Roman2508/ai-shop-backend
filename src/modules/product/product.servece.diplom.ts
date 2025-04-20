import * as fs from 'fs';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { NlpService } from './../nlp/nlp.service';
import { FileService } from '../file/file.service';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateProductInput } from './inputs/create-product.input';
import { UpdateProductInput } from './inputs/update-product.input';
import { convertKeysToCamel } from 'src/shared/utils/convert-keys-to-camel.util';
import { RecommendationService } from '../recommendation/recommendation.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly nlpService: NlpService,
    private readonly fileService: FileService,
    private readonly prismaService: PrismaService,
    private readonly recommendationService: RecommendationService,
  ) {}

  async getAll() {
    const total = await this.prismaService.product.count();

    const products = await this.prismaService.product.findMany({
      orderBy: { createdAt: 'desc' },
      take: 24,
      skip: 0,
    });
    return { products, total };
  }

  getTotalCount() {
    return this.prismaService.product.count();
  }

  async paginateAndFilter(query: any) {
    const { sortBy, limit, skip, priceFrom, priceTo, ...filterParams } = query;

    const filter = [] as any;
    const order = {} as any;

    if (sortBy) {
      if (sortBy === 'price:asc') {
        order.price = 'asc';
      } else if (sortBy === 'price:desc') {
        order.price = 'desc';
      } else if (sortBy === 'new') {
        order.createdAt = 'asc';
      } else if (sortBy === 'rating') {
        order.createdAt = 'desc';
      }
    } else {
      order.createdAt = 'desc';
    }

    if (priceFrom && priceTo) {
      filter.push({ OR: { gte: query.priceFrom, lte: query.priceTo } });
    }

    if (priceFrom && !priceTo) {
      filter.push({ OR: { gte: query.priceFrom } });
    }

    if (!priceFrom && priceTo) {
      filter.push({ OR: { lte: query.priceTo } });
    }

    if (Object.keys(filterParams).length) {
      const keys = ['ram', 'builtInMemory', 'frontCamera', 'mainCamera', 'screenDiagonal', 'battery'];

      for (const key in filterParams) {
        if (keys.includes(key)) {
          const selectedFilters = filterParams[key].split(';');
          const keyFilter = [];
          selectedFilters.forEach((f) => {
            const [from, to] = f.split('-');
            keyFilter.push({ [key]: { gte: Number(from), lte: Number(to) } });
          });

          filter.push({ OR: keyFilter });
        }
        //
        else if (key === 'simFormat' || key === 'deliverySet') {
          const selectedFilters = filterParams[key].split(';');
          filter.push({ OR: { [key]: { hasSome: selectedFilters } } });
        }
        //
        else {
          const query = filterParams[key].split(';');
          const queryFilter = query.map((q: string) => ({ [key]: { contains: q } }));
          filter.push({ OR: queryFilter });
        }
      }
    }

    const products = await this.prismaService.product.findMany({
      where: { AND: filter },
      orderBy: order,
      take: limit ? limit : 24,
      skip: skip ? skip : 0,
    });

    let totalProductsCount = 0;

    if (priceFrom || priceTo || Object.keys(filterParams).length) {
      totalProductsCount = products.length;
    } else {
      totalProductsCount = await this.prismaService.product.count();
    }

    return { products, total: totalProductsCount };

    // where: { AND: [
    //     { OR: [{ ram: { gte: 8, lte: 9 } }, { ram: { gte: 11, lte: 12 } }] },
    //     { OR: [{ frontCamera: { gte: 13, lte: 14 } }, { frontCamera: { gte: 30, lte: 33 } }] },
    //   ]},
  }

  async getById(id: string) {
    const product = await this.prismaService.product.findUnique({
      where: { id },
      include: {
        reviews: {
          include: {
            user: true,
            product: true,
          },
        },
      },
    });

    if (!product) throw new NotFoundException('Товар не знайдено');

    return product;
  }

  async search(input: string) {
    const response = await this.nlpService.analyze(input);

    if (!response) {
      throw new BadRequestException('Помилка');
    }

    const queryObject = JSON.parse(response);

    let prismaQueryObject;

    if (typeof convertKeysToCamel(queryObject) === 'string') {
      prismaQueryObject = JSON.parse(convertKeysToCamel(queryObject));
    } else {
      prismaQueryObject = convertKeysToCamel(queryObject);
    }

    const products = await this.prismaService.product.findMany({ where: prismaQueryObject });

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
    const newProduct = await this.prismaService.product.create({ data: input });
    await this.recommendationService.createProduct(newProduct);
    return newProduct;
  }

  async addPhoto(id: string, file: any) {
    const filename = await this.fileService.upload(file, 'products');
    await this.prismaService.product.update({ where: { id }, data: { images: { push: filename } } });
    return true;
  }

  async removePhotos(id: string, filename: string) {
    const product = await this.prismaService.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Товар не знайдено');
    await this.fileService.removeFile(filename, 'products');
    const filteredImages = product.images.filter((el) => el !== filename);
    await this.prismaService.product.update({ where: { id }, data: { images: filteredImages } });
    return true;
  }

  async update(input: UpdateProductInput) {
    const { productId, ...data } = input;
    await this.prismaService.product.update({
      where: { id: productId },
      data,
    });

    return this.prismaService.product.findUnique({ where: { id: productId } });
  }

  async delete(id: string) {
    this.getById(id);
    await this.prismaService.product.delete({ where: { id } });
    return true;
  }
}
