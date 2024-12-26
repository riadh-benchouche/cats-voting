import {Controller, Post, Body, UsePipes, Get, UseGuards, Req} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LoginDto, loginSchema, RegisterDto, registerSchema} from "./schemas/auth.schema";
import {ZodValidationPipe} from "../common/pipes/zod-validation.pipe";
import {AuthGuard} from "@nestjs/passport";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('register')
    @UsePipes(new ZodValidationPipe(registerSchema))
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Post('login')
    @UsePipes(new ZodValidationPipe(loginSchema))
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth() {

    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleAuthCallback(@Req() req) {
        return this.authService.handleGoogleAuth(req.user);
    }

    @Get('github')
    @UseGuards(AuthGuard('github'))
    async githubAuth() {
    }

    @Get('github/callback')
    @UseGuards(AuthGuard('github'))
    async githubAuthCallback(@Req() req) {
        return this.authService.handleGithubAuth(req.user);
    }
}