import { ProductService } from './product.service';
export declare class ProductResolver {
    private readonly productService;
    constructor(productService: ProductService);
    search(input: string): Promise<{
        id: string;
        title: string;
        price: number;
        color: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}
