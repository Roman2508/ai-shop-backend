import { NlpService } from './../nlp/nlp.service';
import { PrismaService } from 'src/core/prisma/prisma.service';
export declare class ProductService {
    private readonly nlpService;
    private readonly prismaService;
    constructor(nlpService: NlpService, prismaService: PrismaService);
    search(input: string): Promise<{
        id: string;
        title: string;
        price: number;
        color: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}
