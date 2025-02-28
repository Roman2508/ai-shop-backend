import { Args, Query, Resolver } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { ProductModel } from './models/product.model';

@Resolver('Product')
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [ProductModel], { name: 'searchProduct' })
  async search(@Args('data') input: string) {
    return this.productService.search(input);
  }
}
