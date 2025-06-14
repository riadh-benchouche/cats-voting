import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes} from '@nestjs/common';
import {CatsService} from './cats.service';
import {JwtAuthGuard} from "../common/guards/jwt-auth.guard";
import {RolesGuard} from "../common/guards/roles.guard";
import {Roles} from "../common/decorators/roles.decorator";
import {Role} from "../users/schemas/roles.enum";
import {ZodValidationPipe} from "../common/pipes/zod-validation.pipe";
import {createCatDto, createCatSchema, updateCatDto} from "./schemas/cat.schema";
import {Cat} from "./entities/cat.entity";

@Controller('cats')
export class CatsController {
    constructor(private readonly catsService: CatsService) {
    }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @UsePipes(new ZodValidationPipe(createCatSchema))
    async create(@Body() createCatDto: createCatDto): Promise<Cat> {
        return this.catsService.create(createCatDto);
    }

    @Get()
    async findAll(): Promise<Cat[]> {
        return this.catsService.findAll();
    }

    @Get('stats')
    async getGlobalStats() {
        return this.catsService.getGlobalStats();
    }

    @Get('ranking')
    async getFullRanking() {
        return this.catsService.getFullRanking();
    }

    @Get('random-pair')
    @UseGuards(JwtAuthGuard)
    async getRandomPair() {
        return this.catsService.getRandomPair();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Cat> {
        return this.catsService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    async update(@Param('id') id: string,
                 @Body(new ZodValidationPipe(createCatSchema)) updateCatDto: updateCatDto
    ) {
        return this.catsService.update(id, updateCatDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    async remove(@Param('id') id: string): Promise<void> {
        return this.catsService.remove(id);
    }
}
