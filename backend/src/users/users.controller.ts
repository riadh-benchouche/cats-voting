import {Controller, Post, Body, UsePipes, UseGuards, Get, Patch, Param, Delete} from '@nestjs/common';
import {UsersService} from './users.service';
import {
    type createUserDto,
    createUserSchema, updateAccountDto, updateAccountSchema,
    updatePasswordDto,
    updateUserDto,
    updateUserSchema
} from "./schemas/user.schema";
import {User} from "./entities/user.entity";
import {ZodValidationPipe} from "../common/pipes/zod-validation.pipe";
import {JwtAuthGuard} from "../common/guards/jwt-auth.guard";
import {CurrentUser} from "../common/decorators/current-user.decorator";
import {Roles} from "../common/decorators/roles.decorator";
import {RolesGuard} from "../common/guards/roles.guard";
import {UserOwnerGuard} from "../common/guards/user-owner.guard";
import {Role} from "./schemas/roles.enum";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @UsePipes(new ZodValidationPipe(createUserSchema))
    async create(@Body() createUserDto: createUserDto): Promise<User> {
        return this.usersService.create(createUserDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    async findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    async findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    @Patch('account')
    @UseGuards(JwtAuthGuard, UserOwnerGuard)
    async updateAccount(
        @Body() updateAccountDto: updateAccountDto,
        @CurrentUser() user: User
    ) {
        return this.usersService.updateAccount(user, updateAccountDto);
    }

    @Patch('password')
    @UseGuards(JwtAuthGuard, UserOwnerGuard)
    async updatePassword(
        @Body() updatePasswordDto: updatePasswordDto,
        @CurrentUser() user: User
    ) {
        return this.usersService.updatePassword(user, updatePasswordDto);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    async update(@Param('id') id: string,
                 @Body(new ZodValidationPipe(updateUserSchema)) updateUserDto: updateUserDto
    ) {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    async remove(@Param('id') id: string): Promise<void> {
        return this.usersService.remove(id);
    }
}
