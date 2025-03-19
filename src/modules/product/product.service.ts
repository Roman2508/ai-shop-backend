import * as fs from 'fs';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { NlpService } from './../nlp/nlp.service';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateProductInput } from './inputs/create-product.input';
import { UpdateProductInput } from './inputs/update-product.input';
import { FileService } from '../file/file.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly nlpService: NlpService,
    private readonly fileService: FileService,
    private readonly prismaService: PrismaService,
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
        //
        //
        //
        //
        //
        //
        //
        order.createdAt = 'desc';
        //
        //
        //
        //
        //
        //
        //
        //
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

    // Int = ram builtInMemory frontCamera mainCamera screenDiagonal battery
    // Str = color os processorName processorCores materials
    // Arr = simFormat deliverySet

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
    console.log(id);
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
    const newProduct = await this.prismaService.product.create({ data: input });
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

  /* DELETE THIS */
  /* DELETE THIS */
  /* DELETE THIS */
  async createMany() {
    const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    const dataWithCorrectTypes = data.map((el) => ({
      ...el,
      price: Number(el.price),
      ram: Number(el.ram.split(' ')[0]),
      builtInMemory: Number(el.builtInMemory.split(' ')[0]),
      frontCamera: Number(el.frontCamera.split(' ')[0]),
      mainCamera: Number(el.mainCamera.split(' ')[0]),
      screenDiagonal: Number(el.screenDiagonal),
      simCount: Number(el.simCount),
      battery: Number(el.battery.split(' ')[0]),
      simFormat: JSON.parse(el.simFormat.replace(/'/g, '"')),
      processorCores: String(el.processorCores),
    }));

    await this.prismaService.product.createMany({ data: dataWithCorrectTypes });
    console.log('Дані успішно імпортовано');
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
