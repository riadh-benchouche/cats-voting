import {z} from 'zod';
import {Role} from "./roles.enum";

export const createUserSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email').min(1, 'Email is required'),
    password: z
        .string()
        .min(6, 'Password must be at least 6 characters')
        .max(50, 'Password cannot exceed 50 characters')
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/,
            'Password must contain at least one uppercase letter, one lowercase letter, and one number'
        ),
    role: z.enum([Role.ADMIN, Role.USER]).optional()
});

export const updateUserSchema = z.object({
    name: z.string().optional(),
    email: z.string().email('Invalid email').optional(),
    password: z
        .string()
        .min(6, 'Password must be at least 6 characters')
        .max(50, 'Password cannot exceed 50 characters')
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/,
            'Password must contain at least one uppercase letter, one lowercase letter, and one number'
        ).optional(),
    role: z.enum([Role.ADMIN, Role.USER]).optional()
});

export const updatePasswordSchema = z.object({
    oldPassword: z.string(),
    newPassword: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .max(50, 'Password cannot exceed 50 characters')
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/,
            'Password must contain at least one uppercase letter, one lowercase letter, and one number'
        ),
});

export const updateAccountSchema = z.object({
    name: z.string().optional(),
});

export type createUserDto = z.infer<typeof createUserSchema>;
export type updateUserDto = z.infer<typeof updateUserSchema>;
export type updatePasswordDto = z.infer<typeof updatePasswordSchema>;
export type updateAccountDto = z.infer<typeof updateAccountSchema>;