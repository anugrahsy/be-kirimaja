import { Injectable } from '@nestjs/common';
import { Permission } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';


@Injectable()
export class PermissionsService {

  constructor(private prismaService: PrismaService) {}

  async findAll(): Promise<Permission[]> {
    return await this.prismaService.permission.findMany();
  }

  async getUserPermissions(userId: number): Promise<string[]> {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      include: {
        role: {
          include: {
            rolePermissions: {
              include: { permission: true },
            },
          },
        },
      },
    });

    if (!user) return [];

    return user.role?.rolePermissions.map(
      (rp) => rp.permission.key,
    ) || [];
  }

  // ============================================
  // BASIC: Check kalau user punya minimal SATU
  // ============================================
  async userHasPermission(userId: number, permissions: string[]): Promise<boolean> {
    const userPermissions = await this.getUserPermissions(userId);

    return permissions.some((p) => userPermissions.includes(p));
  }

  // ============================================
  // ANY: Check user punya salah satu dari array
  // ============================================
  async userHasAnyPermission(userId: number, permissions: string[]): Promise<boolean> {
    const userPermissions = await this.getUserPermissions(userId);

    return permissions.some((p) => userPermissions.includes(p));
  }

  // ============================================
  // ALL: Check user harus punya SEMUA permission
  // ============================================
  async userHasAllPermissions(userId: number, permissions: string[]): Promise<boolean> {
    const userPermissions = await this.getUserPermissions(userId);

    return permissions.every((p) => userPermissions.includes(p));
  }
}
