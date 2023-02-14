import { Module } from '@nestjs/common';
import { RoleEntity } from './role.entity';

@Module({ imports: [RoleEntity] })
export class RoleModule {}
