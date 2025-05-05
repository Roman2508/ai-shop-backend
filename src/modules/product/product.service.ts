import * as fs from 'fs';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { NlpService } from './../nlp/nlp.service';
import { FileService } from '../file/file.service';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateProductInput } from './inputs/create-product.input';
import { UpdateProductInput } from './inputs/update-product.input';
import { convertKeysToCamel } from 'src/shared/utils/convert-keys-to-camel.util';
import { RecommendationService } from '../recommendation/recommendation.service';

const desc = {
  айфон: 'iphone',
  'айфон 12': 'iphone 12',
  'айфон 12 про': 'iphone 12 pro',
  'айфон 12 про макс': 'iphone 12 pro max',
  iphone: 'iphone',
  'iphone 12': 'iphone 12',
  'iphone 12 pro': 'iphone 12 pro',
  'iphone 12 pro max': 'iphone 12 pro max',
  'айфон 13': 'iphone 13',
  'айфон 13 про': 'iphone 13 pro',
  'айфон 13 про макс': 'iphone 13 pro max',
  'iphone 13': 'iphone 13',
  'iphone 13 pro': 'iphone 13 pro',
  'iphone 13 pro max': 'iphone 13 pro max',
  'айфон 14': 'iphone 14',
  'айфон 14 про': 'iphone 14 pro',
  'айфон 14 про макс': 'iphone 14 pro max',
  'iphone 14': 'iphone 14',
  'iphone 14 pro': 'iphone 14 pro',
  'iphone 14 pro max': 'iphone 14 pro max',
  'айфон 15': 'iphone 15',
  'айфон 15 про': 'iphone 15 pro',
  'айфон 15 про макс': 'iphone 15 pro max',
  'iphone 15': 'iphone 15',
  'iphone 15 pro': 'iphone 15 pro',
  'iphone 15 pro max': 'iphone 15 pro max',
  'айфон 16': 'iphone 16',
  'айфон 16 про': 'iphone 16 pro',
  'айфон 16 про макс': 'iphone 16 pro max',
  'iphone 16': 'iphone 16',
  'iphone 16 pro': 'iphone 16 pro',
  'iphone 16 pro max': 'iphone 16 pro max',
  samsung: 'samsung',
  'samsung s22': 'samsung galaxy s22',
  'samsung s 22': 'samsung galaxy s22',
  'самсунг с22': 'samsung galaxy s22',
  'самсунг с 22': 'samsung galaxy s22',
  'samsung s22 ultra': 'samsung galaxy s22 ultra',
  'samsung s 22 ultra': 'samsung galaxy s22 ultra',
  'самсунг с22 ультра': 'samsung galaxy s22 ultra',
  'самсунг с 22 ультра': 'samsung galaxy s22 ultra',
  'samsung s23': 'samsung galaxy s23',
  'samsung s 23': 'samsung galaxy s23',
  'самсунг с23': 'samsung galaxy s23',
  'самсунг с 23': 'samsung galaxy s23',
  'samsung s23 ultra': 'samsung galaxy s23 ultra',
  'samsung s 23 ultra': 'samsung galaxy s23 ultra',
  'самсунг с23 ультра': 'samsung galaxy s23 ultra',
  'самсунг с 23 ультра': 'samsung galaxy s23 ultra',
  'samsung s24': 'samsung galaxy s24',
  'samsung s 24': 'samsung galaxy s24',
  'самсунг с24': 'samsung galaxy s24',
  'самсунг с 24': 'samsung galaxy s24',
  'samsung s24 ultra': 'samsung galaxy s24 ultra',
  'samsung s 24 ultra': 'samsung galaxy s24 ultra',
  'самсунг с24 ультра': 'samsung galaxy s24 ultra',
  'самсунг с 24 ультра': 'samsung galaxy s24 ultra',
  'samsung s25': 'samsung galaxy s25',
  'samsung s 25': 'samsung galaxy s25',
  'самсунг с25': 'samsung galaxy s25',
  'самсунг с 25': 'samsung galaxy s25',
  'samsung s25 ultra': 'samsung galaxy s25 ultra',
  'samsung s 25 ultra': 'samsung galaxy s25 ultra',
  'самсунг с25 ультра': 'samsung galaxy s25 ultra',
  'самсунг с 25 ультра': 'samsung galaxy s25 ultra',
  xiaomi: 'xiaomi',
  'xiaomi redmi 12': 'xiaomi redmi 12',
  'xiaomi redmi note 12': 'xiaomi redmi note 12',
  'сяомі редмі 12': 'xiaomi redmi 12',
  'сяомі редмі ноут 12': 'xiaomi redmi note 12',
  'xiaomi redmi 13': 'xiaomi redmi 13',
  'xiaomi redmi note 13': 'xiaomi redmi note 13',
  'сяомі редмі 13': 'xiaomi redmi 13',
  сяомі: 'xiaomi',
  'сяомі редмі ноут 13': 'xiaomi redmi note 13',
  'xiaomi redmi 14': 'xiaomi redmi 14',
  'xiaomi redmi note 14': 'xiaomi redmi note 14',
  'сяомі редмі 14': 'xiaomi redmi 14',
  'сяомі редмі ноут 14': 'xiaomi redmi note 14',
  'xiaomi redmi 15': 'xiaomi redmi 15',
  'xiaomi redmi note 15': 'xiaomi redmi note 15',
  'сяомі редмі 15': 'xiaomi redmi 15',
  'сяомі редмі ноут 15': 'xiaomi redmi note 15',
  'oneplus one plus ванплас ван плас': 'oneplus',
  'google pixel/гугл піксель/піксель/гугл': 'google pixel',
  'motorola/моторола/мото': 'motorola',
  'nokia/нокіа': 'nokia',
  'poco/поко': 'poco',
  'oppo/оппо': 'oppo',
  'realme/реалмі': 'realme',
  'huawei/хуавей': 'huawei',
  'honor/хонор/онор': 'honor',
  'meizu/мейзу': 'meizu',
  'sony/соні': 'sony',
};

@Injectable()
export class ProductService {
  constructor(
    private readonly nlpService: NlpService,
    private readonly fileService: FileService,
    private readonly prismaService: PrismaService,
    private readonly recommendationService: RecommendationService,
  ) {}

  private getDescriptionQuery(text: string): { title: { contains: string; mode: 'insensitive' } } {
    const lowerText = text.toLowerCase();

    for (const key in desc) {
      if (key.includes(lowerText)) {
        return { title: { contains: desc[key], mode: 'insensitive' } };
      }
    }
  }

  async getAll(userId: string) {
    const user = await this.prismaService.user.findUnique({ where: { id: userId } });

    if (!user || user.viewedProducts.length < 5) {
      const total = await this.prismaService.product.count();

      const products = await this.prismaService.product.findMany({
        orderBy: { createdAt: 'desc' },
        take: 24,
        skip: 0,
      });
      return { products, total };
    }

    const similarProductsIds = await this.recommendationService.findSimilarProducts(user.viewedProducts);

    const prioritizedProducts = await this.prismaService.product.findMany({
      where: { id: { in: similarProductsIds } },
    });

    const remainingCount = 24 - prioritizedProducts.length;

    let otherProducts = [];

    if (remainingCount > 0) {
      otherProducts = await this.prismaService.product.findMany({
        where: { id: { notIn: similarProductsIds } },
        take: remainingCount,
      });
    }

    const total = await this.prismaService.product.count();
    return { products: [...prioritizedProducts, ...otherProducts], total };
  }

  getTotalCount() {
    return this.prismaService.product.count();
  }

  async paginateAndFilter(query: any) {
    const filtredEntries = Object.entries(query).filter(
      ([_, value]) => value !== null && value !== undefined && value !== '',
    );
    const filtredQuery = Object.fromEntries(filtredEntries);

    const { sortBy, limit, skip, priceFrom, priceTo, ...filterParams } = filtredQuery as any;

    const filter = [] as any;
    const order = {} as any;

    if (sortBy) {
      if (sortBy === 'price:asc') {
        order.price = 'asc';
      } else if (sortBy === 'price:desc') {
        order.price = 'desc';
      } else if (sortBy === 'new') {
        order.createdAt = 'desc';
      } else if (sortBy === 'rating') {
        order.createdAt = 'asc';
      }
    } else {
      order.createdAt = 'desc';
    }

    if (priceFrom && priceTo) {
      filter.push({ price: { gte: query.priceFrom, lte: query.priceTo } });
    }

    if (priceFrom && !priceTo) {
      filter.push({ price: { gte: query.priceFrom } });
    }

    if (!priceFrom && priceTo) {
      filter.push({ price: { lte: query.priceTo } });
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
          const queryFilter = query.map((q: string) => ({ [key]: { contains: q, mode: 'insensitive' } }));
          filter.push({ OR: queryFilter });
        }
      }
    }

    const products = await this.prismaService.product.findMany({
      where: { AND: filter },
      orderBy: order,
      take: limit ? limit : 24,
      skip: skip ? skip : 0,
      include: { reviews: true },
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
      include: { reviews: { include: { user: true, product: true } } },
    });

    if (!product) throw new NotFoundException('Товар не знайдено');
    return product;
  }

  async search(input: string) {
    const response: string = await this.nlpService.analyze(input);
    const queryObject = JSON.parse(response ? response : '{}');

    let prismaQueryObject;

    if (typeof convertKeysToCamel(queryObject) === 'string') {
      prismaQueryObject = JSON.parse(convertKeysToCamel(queryObject));
    } else {
      prismaQueryObject = convertKeysToCamel(queryObject);
    }

    const titleQuery = this.getDescriptionQuery(input);
    const query = titleQuery ? { ...prismaQueryObject, ...titleQuery } : prismaQueryObject;

    let products = [];

    if (Object.keys(query).length) {
      products = await this.prismaService.product.findMany({ where: query });
    }

    if (!products.length) {
      const query = this.getDescriptionQuery(input);
      const filterObject: any = {};

      const priceQuery =
        input.toLocaleLowerCase().includes('дешевий') || input.toLocaleLowerCase().includes('бюджетний');
      const cameraQuery =
        input.toLocaleLowerCase().includes('якісна камера') ||
        input.toLocaleLowerCase().includes('гарна камера') ||
        input.toLocaleLowerCase().includes('якісною камерою') ||
        input.toLocaleLowerCase().includes('гарною камерою');
      const osAndroidQuery =
        input.toLocaleLowerCase().includes('андроїд') ||
        input.toLocaleLowerCase().includes('андроід') ||
        input.toLocaleLowerCase().includes('android');
      const osIosQuery =
        input.toLocaleLowerCase().includes('айос') ||
        input.toLocaleLowerCase().includes('ios') ||
        input.toLocaleLowerCase().includes('епл');

      if (query) {
        filterObject.title = { contains: input, mode: 'insensitive' };
      }

      if (priceQuery) {
        filterObject.price = { lte: 10000 };
      }

      if (cameraQuery) {
        filterObject.mainCamera = { gte: 40 };
      }

      if (osAndroidQuery) {
        filterObject.os = { contains: 'android', mode: 'insensitive' };
      }

      if (osIosQuery) {
        filterObject.os = { contains: 'ios', mode: 'insensitive' };
      }

      const products = await this.prismaService.product.findMany({ where: query ? query : filterObject });

      if (!products.length) {
        throw new NotFoundException('Нічого не знайдено');
      }

      return products;
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

  async getSimilar(userId: string) {
    const user = await this.prismaService.user.findUnique({ where: { id: userId } });

    if (!user || user.viewedProducts.length < 5) {
      const products = await this.prismaService.product.findMany({ take: 10, orderBy: { id: 'desc' } });
      return products;
    }

    const similarProductsIds = await this.recommendationService.findSimilarProducts(user.viewedProducts);

    const prioritizedProducts = await this.prismaService.product.findMany({
      where: { id: { in: similarProductsIds } },
    });

    const remainingCount = 10 - prioritizedProducts.length;

    let otherProducts = [];

    if (remainingCount > 0) {
      otherProducts = await this.prismaService.product.findMany({
        where: { id: { notIn: similarProductsIds } },
        take: remainingCount,
      });
    }

    const result = [...prioritizedProducts, ...otherProducts];
    return result;
  }

  async create(input: CreateProductInput) {
    const newProduct = await this.prismaService.product.create({ data: input });
    await this.recommendationService.createProductVector(newProduct);
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

    await this.prismaService.product.createMany({ data: dataWithCorrectTypes.slice(0, 10) });

    let products = await this.prismaService.product.findMany();

    products = products.slice(0, 109);

    await Promise.all(
      products.map(async (el) => {
        const exited = await this.prismaService.product.findUnique({
          where: { id: el.id },
          include: { embedding: true },
        });

        if (exited.embedding) {
          console.log(`Product with ID ${el.id} already have embedding`);
          return;
        }

        await this.recommendationService.createProductVector(el);
      }),
    );

    console.log('Дані успішно імпортовано');
    return true;
  }

  async createAllEmbeddings() {
    const allProducts = await this.prismaService.product.findMany();
    const allEmbeddings = await this.prismaService.productEmbeding.findMany();

    const productsWithoutEmbeddings = [];

    for (let i = 0; i < allProducts.length; i++) {
      const isExist = allEmbeddings.some((emb) => emb.productId === allProducts[i].id);
      if (!isExist) {
        productsWithoutEmbeddings.push(allProducts[i]);
      }
    }

    await Promise.all(
      productsWithoutEmbeddings.map(async (el) => {
        await this.recommendationService.createProductVector(el);
      }),
    );

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
