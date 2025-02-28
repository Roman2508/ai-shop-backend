import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { NlpModule } from '../nlp/nlp.module';

@Module({
  providers: [ProductResolver, ProductService],
  imports: [NlpModule],
})
export class ProductModule {}
