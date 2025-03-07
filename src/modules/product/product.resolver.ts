import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { ProductService } from './product.service';
import { ProductModel } from './models/product.model';
import { CreateProductInput } from './inputs/create-product.input';
import { UpdateProductInput } from './inputs/update-product.input';
import { Authorization } from 'src/shared/decorators/auth.decorator';

@Resolver('Product')
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [ProductModel], { name: 'getAllProducts' })
  async getAll() {
    return this.productService.getAll();
  }

  @Query(() => ProductModel, { name: 'getProductById' })
  async getById(@Args('productId') productId: string) {
    return this.productService.getById(productId);
  }

  @Query(() => [ProductModel], { name: 'searchProduct' })
  async search(@Args('data') input: string) {
    return this.productService.search(input);
  }

  @Query(() => [ProductModel], { name: 'getMostPopularProducts' })
  async getMostPopular() {
    return this.productService.getMostPopular();
  }

  @Query(() => ProductModel, { name: 'getSimilarProducts' })
  async getSimilar(@Args('productId') productId: string) {
    return this.productService.getSimilar(productId);
  }

  @Authorization()
  @Mutation(() => ProductModel, { name: 'createProduct' })
  async create(@Args('data') input: CreateProductInput) {
    return this.productService.create(input);
  }

  @Mutation(() => Boolean, { name: 'createManyProducts' })
  async createMany() {
    return this.productService.createMany();
  }

  @Authorization()
  @Mutation(() => ProductModel, { name: 'updateProduct' })
  async update(@Args('data') input: UpdateProductInput) {
    return this.productService.update(input);
  }

  @Authorization()
  @Mutation(() => ProductModel, { name: 'updateProduct' })
  async delete(@Args('productId') productId: string) {
    return this.productService.delete(productId);
  }
}
