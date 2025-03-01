import { Module } from '@nestjs/common';
import { FileStorageService } from './file-storage.service';
import { FileStorageResolver } from './file-storage.resolver';

@Module({
  providers: [FileStorageResolver, FileStorageService],
})
export class FileStorageModule {}
