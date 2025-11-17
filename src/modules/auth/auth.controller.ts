import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthLoginResponse } from './response/auth-login.dto';

@Controller('auth')
export class AuthController { 
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() request: AuthLoginDto): Promise<AuthLoginResponse> {
        return await this.authService.login(request);
    } 

    @Post('register')
    async rtegister(@Body() request: AuthRegisterDto): Promise<AuthLoginResponse> {
        return await this.authService.register(request);
    }
    
}

