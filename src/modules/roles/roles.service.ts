import { Injectable } from '@nestjs/common';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/common/prisma/prisma.service'
import { RoleResponse } from '../auth/response/auth-login.dto';

@Injectable()
export class RolesService {
  rolesService: any;
  constructor(private PrismaService: PrismaService) { }

  async findAll(): Promise<RoleResponse[]> {
    const roles = await this.PrismaService.role.findMany({
      include: {
        rolePermissions: {
          include: {
            permission: true,
          }
        }
      }
    });

    return roles.map(role => {
      return {
        id: role.id,
        name: role.name,
        key: role.key,
        permissions: role.rolePermissions.map(rp => ({
          id: rp.permission.id,
          name: rp.permission.name,
          key: rp.permission.key,
          resource: rp.permission.resource
        }))
      }
    })
  }


  async findOne(id: number): Promise<RoleResponse> {
    const role = await this.PrismaService.role.findUnique({
      where: { id },
      include: {
        rolePermissions: {
          include: {
            permission: true
          },
        },
      },
    });

    if (!role) {
      throw new Error(`Role with id ${id} not found`);
    }

    return {
      id: role.id,
      name: role.name,
      key: role.key,
      permissions: role.rolePermissions.map((rp) => ({
        id: rp.permission.id,
        key: rp.permission.key,
        name: rp.permission.name,
        resource: rp.permission.resource
      }))
    };
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<RoleResponse> {
    // Pastikan role exist
    await this.findOne(id);

    // Hapus semua role-permission lama
    await this.PrismaService.rolePermission.deleteMany({
      where: { roleId: id },
    });

    // Tambahkan kembali permission jika ada
    if (updateRoleDto.permission_ids?.length > 0) {
      const rolePermissions = updateRoleDto.permission_ids.map((permissionId) => ({
        roleId: id,
        permissionId,
      }));

      await this.PrismaService.rolePermission.createMany({
        data: rolePermissions,
        skipDuplicates: true,
      });
    }

    // Return data terbaru
    return this.findOne(id);
  }

}
