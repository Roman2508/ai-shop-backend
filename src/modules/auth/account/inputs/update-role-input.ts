import { IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

import { EnumUserRoles } from 'prisma/generated';

@InputType()
export class UpdateRoleInput {
  @Field()
  @IsString()
  id: string;

  @Field()
  role: EnumUserRoles;
}
