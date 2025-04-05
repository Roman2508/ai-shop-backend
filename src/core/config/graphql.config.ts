import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { ApolloDriverConfig } from '@nestjs/apollo';

import { isDev } from 'src/shared/utils/is-dev.util';

export const getGraphglConfig = (configService: ConfigService): ApolloDriverConfig => {
  return {
    playground: isDev(configService),
    path: configService.getOrThrow<string>('GRAPHQL_PREFIX'),
    autoSchemaFile: join(process.cwd(), 'src/core/graphql/schema.gql'),
    sortSchema: true,
    context: ({ req, res }) => ({ req, res }),
  };
};
