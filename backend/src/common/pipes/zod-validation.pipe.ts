import { PipeTransform, BadRequestException, Injectable } from '@nestjs/common';
import { ZodSchema } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
    constructor(private schema: ZodSchema) {}

    transform(value: unknown) {
        try {
            return this.schema.parse(value);
        } catch (error) {
            throw new BadRequestException({
                message: 'Validation failed',
                errors: error.errors,
            });
        }
    }
}