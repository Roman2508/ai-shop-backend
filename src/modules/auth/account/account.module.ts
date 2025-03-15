import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountResolver } from './account.resolver';
import { FileModule } from 'src/modules/file/file.module';

@Module({
  providers: [AccountResolver, AccountService],
  imports: [FileModule],
})
export class AccountModule {}
