import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './modules/auth/guards/logged-in.guard';
import { RequireAnyPermissions } from './modules/auth/decorator/permissions.decorator';
import { PermissionGuard } from './modules/auth/guards/permission.guard';

@Controller()
@UseGuards(JwtAuthGuard, PermissionGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('protected')
  @RequireAnyPermissions('permissions.manage')
  getProtectedResources(): string {
    return 'this is a protected resource';
  }
}
