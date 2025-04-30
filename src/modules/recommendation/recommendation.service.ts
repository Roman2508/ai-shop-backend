const path = require('path');
import * as fs from 'fs';
import * as os from 'os';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { PythonShell } from 'python-shell';
import { Injectable } from '@nestjs/common';
import { writeFileSync, unlinkSync } from 'fs';
import { ConfigService } from '@nestjs/config';

import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateVectorInput } from './inputs/create.vector.input';

// const TMP_PATH = path.join(process.cwd(), 'src/modules/recommendation/python/tmp');
const MAIN_SCRIPT_PATH = path.join(process.cwd(), 'src/modules/recommendation/python/main.py');
const SEARCH_SCRIPT_PATH = path.join(process.cwd(), 'src/modules/recommendation/python/search.py');
const PYTHON_PATH = path.join(process.cwd(), 'src/modules/recommendation/python/venv/Scripts/python.exe');

@Injectable()
export class RecommendationService {
  private readonly PYTHON_PATH: string;

  constructor(
    private prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {
    this.PYTHON_PATH = this.configService.getOrThrow<string>('PYTHON_PATH') || 'python';
  }

  async createProductVector(dto: CreateVectorInput) {
    const textRepresentation = this.createTextRepresentation(dto);
    const embedding = await this.generateEmbedding(textRepresentation);

    return this.prisma.productEmbeding.create({
      data: {
        product: { connect: { id: String(dto.id) } },
        vector: embedding,
      },
    });
  }

  private createTextRepresentation(product: any): string {
    return `
        title: ${product.title},
        price: ${product.price},
        brand: ${product.brand},
        ram: ${product.ram},
        builtInMemory: ${product.builtInMemory},
        color: ${product.color},
        frontCamera: ${product.frontCamera},
        mainCamera: ${product.mainCamera},
        screenDiagonal: ${product.screenDiagonal},
        simCount: ${product.simCount},
        simFormat: ${product.simFormat},
        os: ${product.os},
        processorName: ${product.processorName},
        processorCores: ${product.processorCores},
        battery: ${product.battery},
        materials: ${product.materials},
        deliverySet: ${product.deliverySet}
      `;
  }

  private async generateEmbedding(text: string): Promise<number[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await PythonShell.run(MAIN_SCRIPT_PATH, { args: [text], pythonPath: this.PYTHON_PATH });
        if (!result) return reject('No result from Python script');
        const embedding = JSON.parse(result[0]);
        resolve(embedding);
      } catch (e) {
        reject(e);
      }
    });
  }

  /*  */

  async findSimilarProducts(viewedProductIds: string[]) {
    if (viewedProductIds.length === 0) return [];

    const allVectors = await this.prisma.productEmbeding.findMany();
    const viewedProductsVectors = allVectors.filter((el) => viewedProductIds.includes(el.productId));

    // Проверяем, есть ли векторы
    if (!viewedProductsVectors.length) return [];

    const vectorsArray = viewedProductsVectors.map((p) => p.vector);
    const allVectorsArray = allVectors.map((p) => p.vector);

    // Усредняем векторы (создаем общий вектор интересов пользователя)
    // const userVector = this.averageVectors(vectorsArray);

    // Запускаем Python-скрипт для поиска ближайших соседей
    const similarProductIds = (await this.findNearestNeighbors(vectorsArray, allVectorsArray)) as unknown as {
      ids: string[];
      distances: string[];
    };

    const result = similarProductIds.ids.map((id, index) => ({
      id,
      distance: similarProductIds.distances[index],
    }));

    const unique = result.filter((item, index, self) => self.findIndex((el) => el.id === item.id) === index);
    const uniqueIds = unique.map((el) => el.id);

    const productsIdByVectors = await Promise.all(
      uniqueIds.map(async (el) => {
        const product = await this.prisma.productEmbeding.findUnique({ where: { id: Number(el) } });
        if (!product) {
          console.log(`Product embedding with ID ${el} is not exist`);
          return '';
        }

        return product.productId;
      }),
    );

    const existedProductsIdByVectors = productsIdByVectors.filter((el) => el !== 'null' && !!el);
    return existedProductsIdByVectors;

    // const products = await this.prisma.product.findMany({
    //   where: { id: { in: existedProductsIdByVectors } },
    // });

    // return products;
  }

  private async findNearestNeighbors(queryVector: any[], allVectors: any[]): Promise<string[]> {
    const filename = `input_${uuidv4()}.json`;
    const filepath = join(os.tmpdir(), filename);
    // const filepath = join(TMP_PATH, filename);

    return new Promise(async (resolve, reject) => {
      try {
        writeFileSync(filepath, JSON.stringify({ queryVector, allVectors }), 'utf-8');

        const result = await PythonShell.run(SEARCH_SCRIPT_PATH, {
          args: [filepath],
          pythonPath: this.PYTHON_PATH,
        });
        if (!result) return reject('No result from Python script');

        const embedding = JSON.parse(result[result.length - 1]);

        resolve(embedding);
      } catch (e) {
        reject(e);
      } finally {
        try {
          if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
          }
        } catch (cleanupError) {
          console.error('Помилка при видаленні тимчасового файлу:', cleanupError);
        }
      }
    });
  }
}
