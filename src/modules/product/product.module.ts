import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { NlpModule } from '../nlp/nlp.module';
import { FileModule } from '../file/file.module';

@Module({
  providers: [ProductResolver, ProductService],
  exports: [ProductService],
  imports: [NlpModule, FileModule],
})
export class ProductModule {}
