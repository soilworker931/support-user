import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from './ormconfig';
import { RoleModule } from './roles/role.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), RoleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
