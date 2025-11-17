 import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/common/prisma/prisma.service';


@Module({
    imports: [],
    controllers: [AuthController],
    providers: [AuthService, JwtService, PrismaService],
})
export class AuthModule {}
