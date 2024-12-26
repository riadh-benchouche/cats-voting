import {ConflictException, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";
import {
    type createUserDto,
    type updateUserDto,
    type updatePasswordDto,
    type updateAccountDto,
    createUserSchema,
} from "./schemas/user.schema";
import * as bcrypt from 'bcrypt';
import {Role} from "./schemas/roles.enum";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
    }

    async create(createUserDto: createUserDto) {
        const validatedData = createUserSchema.parse(createUserDto);
        const {password, email, role} = validatedData;

        const userExists = await this.userRepository.findOne({where: {email}});
        if (userExists) {
            throw new ConflictException('Email already in use');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userRole = role ?? Role.USER;

        const user = this.userRepository.create({...validatedData, password: hashedPassword, role: userRole});
        return this.userRepository.save(user);
    }

    async findAll() {
        return this.userRepository.find({
            select: ['id', 'name', 'email', 'role', 'created_at', 'updated_at'],
            where: {deleted_at: null}
        });
    }

    async findOne(id: string) {
        const user = await this.userRepository.findOne({
            select: ['id', 'name', 'email', 'role', 'created_at', 'updated_at'],
            where: {id, deleted_at: null}
        });

        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    async update(id: string, updateUserDto: updateUserDto) {
        const user = await this.findOne(id);

        if (updateUserDto.email) {
            const emailExists = await this.userRepository.findOne({
                where: {email: updateUserDto.email}
            });
            if (emailExists && emailExists.id !== id) {
                throw new ConflictException('Email already in use');
            }
        }

        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
        }
        await this.userRepository.update(id, {
            ...updateUserDto,
            role: updateUserDto.role ?? user.role,
            updated_at: new Date()
        });

        return this.findOne(id);
    }

    async updatePassword(user: User, {oldPassword, newPassword}: updatePasswordDto) {
        const currentUser = await this.userRepository.findOne({
            select: ['password'],
            where: {id: user.id}
        });
        const isValidPassword = await bcrypt.compare(oldPassword, currentUser.password);
        if (!isValidPassword) throw new UnauthorizedException('Invalid current password');

        user.password = await bcrypt.hash(newPassword, 10);
        await this.userRepository.save(user);
        return {message: 'Password updated successfully'};
    }

    async updateAccount(user: User, updateAccountDto: updateAccountDto) {
        await this.userRepository.update(user.id, updateAccountDto);
        return this.findOne(user.id);
    }

    async remove(id: string) {
        await this.userRepository.softDelete(id);
        return Promise.resolve();
    }
}
