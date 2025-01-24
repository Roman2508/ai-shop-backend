import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { LangchainModule } from './langchain/langchain.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // isGlobal: true, // Makes the ConfigModule available globally
      // envFilePath: '.env', // Specifies the path to the .env file (optional if using the default)
    }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'username',
    //   password: 'password',
    //   database: 'testdb',
    //   // entities: users, products,
    //   entities: [],
    //   synchronize: true,
    // }),
    LangchainModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
