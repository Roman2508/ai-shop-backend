const path = require('path');
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { spawn } from 'child_process';
import { PythonShell } from 'python-shell';
import { Injectable } from '@nestjs/common';
import { writeFileSync, unlinkSync } from 'fs';

import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateVectorInput } from './inputs/create.vector.input';

const TMP_PATH = path.join(process.cwd(), 'src/modules/recommendation/python/tmp');
const MAIN_SCRIPT_PATH = path.join(process.cwd(), 'src/modules/recommendation/python/main.py');
const SEARCH_SCRIPT_PATH = path.join(process.cwd(), 'src/modules/recommendation/python/search.py');
const PYTHON_PATH = path.join(process.cwd(), 'src/modules/recommendation/python/venv/Scripts/python.exe');

@Injectable()
export class RecommendationService {
  constructor(private prisma: PrismaService) {}

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
        const result = await PythonShell.run(MAIN_SCRIPT_PATH, { args: [text], pythonPath: PYTHON_PATH });
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

    // Получаем векторы просмотренных товаров
    // const viewedProductsVectors = await this.prisma.productEmbeding.findMany({
    //   where: { product: { id: { in: viewedProductIds } } },
    // });

    const allVectors = await this.prisma.productEmbeding.findMany();

    const viewedProductsVectors = allVectors.filter((el) => viewedProductIds.includes(el.productId));

    // Проверяем, есть ли векторы
    if (!viewedProductsVectors.length) return [];

    const vectorsArray = viewedProductsVectors.map((p) => p.vector);
    const allVectorsArray = allVectors.map((p) => p.vector);

    // Усредняем векторы (создаем общий вектор интересов пользователя)
    // const userVector = this.averageVectors(vectorsArray);

    // Запускаем Python-скрипт для поиска ближайших соседей
    const similarProductIds = await this.findNearestNeighbors(vectorsArray, allVectorsArray);

    const simProdIds = await Promise.all(
      // @ts-ignore
      similarProductIds.ids.map(async (el) => {
        const product = await this.prisma.productEmbeding.findUnique({ where: { id: el } });
        if (!product) {
          console.log(`Product embedding with ID ${el} is not exist`);
          return;
        }

        return product.productId;
      }),
    );

    const existedIds = simProdIds.filter((el) => el !== 'null' && !!el);

    const products = await this.prisma.product.findMany({
      where: { id: { in: existedIds } },
    });

    return products;

    // Возвращаем найденные товары, отсортированные по схожести
    // return this.prisma.product.findMany({
    //   where: { id: { in: similarProductIds } },
    //   orderBy: {
    //     id: { in: similarProductIds }, // сохраняем порядок
    //   },
    // });
  }

  private averageVectors(vectors: any): number[] {
    // private averageVectors(vectors: number[][]): number[] {
    const length = vectors[0].length;
    const avgVector = new Array(length).fill(0);

    vectors.forEach((vector) => {
      for (let i = 0; i < length; i++) {
        avgVector[i] += vector[i];
      }
    });

    return avgVector.map((value) => value / vectors.length);
  }

  private async findNearestNeighbors(queryVector: any[], allVectors: any[]): Promise<string[]> {
    const filename = `input_${uuidv4()}.json`;
    const filepath = join(TMP_PATH, filename);

    return new Promise(async (resolve, reject) => {
      try {
        writeFileSync(filepath, JSON.stringify({ queryVector, allVectors }), 'utf-8');

        const result = await PythonShell.run(SEARCH_SCRIPT_PATH, {
          args: [filepath],
          pythonPath: PYTHON_PATH,
        });
        if (!result) return reject('No result from Python script');
        const embedding = JSON.parse(result[0]);

        console.log('result:', result);

        resolve(embedding);
      } catch (e) {
        reject(e);
      } finally {
        unlinkSync(filepath);
      }
    });
  }
}
