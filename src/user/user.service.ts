import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Cliente } from "@prisma/client";
import { CreateUserDto } from "src/db/dto/create-user.dto";
import * as bcrypt from "bcrypt";
import { plainToClass } from "class-transformer";
import { SelectUserDto } from "src/db/dto/select-user.dto";

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService) { }

    async createUser(data: CreateUserDto): Promise<Cliente> {
        const hashedPassword = await this.hashPasword(data.password);
        return this.prisma.cliente.create({
            data: {
                nombre: data.nombre,
                email: data.email,
                password: hashedPassword
            }
        });
    }

    async getAllUsers(): Promise<SelectUserDto[]> {
        const userList = this.prisma.cliente.findMany();
        return (await userList).map(
            user => {
                return plainToClass(SelectUserDto, user, { excludeExtraneousValues: true })
            }
        )
    }

    async hashPasword(password): Promise<string> {
        const saltRounds = 10;
        const hashedPassword = bcrypt.hash(password, saltRounds);

        return hashedPassword;
    }
}