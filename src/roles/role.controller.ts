import { Controller, Get } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleEntity } from './role.entity';

@Controller('api')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get('roles')
  async getRoles(): Promise<RoleEntity[]> {
    return this.roleService.getRoles();
  }
}
