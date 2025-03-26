import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';
import * as faiss from 'faiss-node';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class RecommendationService {
  constructor(private prisma: PrismaService) {}

  // Вызов Python-скрипта для генерации эмбеддинга
  private async generateEmbedding(text: string): Promise<number[]> {
    return new Promise((resolve, reject) => {
      const python = spawn('python3', ['scripts/generate_embedding.py', text]);

      let output = '';
      python.stdout.on('data', (data) => (output += data.toString()));

      python.stderr.on('data', (data) => console.error(data.toString()));

      python.on('close', (code) => {
        if (code === 0) {
          resolve(JSON.parse(output));
        } else {
          reject(new Error('Failed to generate embedding'));
        }
      });
    });
  }

  // Создание товара с эмбеддингом
  async createProduct(data: {
    name: string;
    description: string;
    price: number;
    os: string;
    ram: number;
    storage: number;
    color: string;
  }) {
    const textRepresentation = `
      Назва: ${data.name},
      Ціна: ${data.price},
      Опис: ${data.description},
      Операційна система: ${data.os},
      Оперативна пам'ять: ${data.ram} ГБ,
      Вбудована пам'ять: ${data.storage} ГБ,
      Колір: ${data.color}
    `;

    const embedding = await this.generateEmbedding(textRepresentation);

    // const product = await this.prisma.product.create({
    //   data: {
    //     ...data,
    //     embedding: {
    //       create: { vector: embedding },
    //     },
    //   },
    // });

    // return product;
  }

  // Загрузка эмбеддингов в FAISS
  private async loadFaissIndex() {
    // const embeddings = await this.prisma.productEmbedding.findMany();
    // const dim = 3072;
    // const index = new faiss.IndexFlatL2(dim);
    // const vectors = embeddings.map((e) => Float32Array.from(e.vector));
    // vectors.forEach((v) => index.add(v));
    // return index;
  }

  // Получение рекомендаций по пользователю
  async getRecommendations(userId: number) {
    // const views = await this.prisma.userView.findMany({
    //   where: { userId },
    //   include: { product: { include: { embedding: true } } },
    //   orderBy: { viewedAt: 'desc' },
    //   take: 10,
    // });

    // const index = await this.loadFaissIndex();
    // const userVectors = views.map((v) => Float32Array.from(v.product.embedding.vector));

    // const k = 5; // Количество рекомендаций
    // const results = userVectors.flatMap((vector) => index.search(vector, k).labels);

    // const uniqueIds = Array.from(new Set(results));
    // return this.prisma.product.findMany({ where: { id: { in: uniqueIds } } });
  }
}
