import { registerAs } from '@nestjs/config';

export const jwtConfig = registerAs('jwt', () => ({
    secret: process.env.JWT_SECRET || 'super-secret',
    expiresIn: '1d',
}));