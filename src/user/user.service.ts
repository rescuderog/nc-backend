import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/db/prisma.service";
import { Cliente } from "@prisma/client";
import { CreateUserDto } from "src/db/dto/create-user.dto";
import * as bcrypt from "bcrypt";

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

    async hashPasword(password): Promise<string> {
        const saltRounds = 10;
        const hashedPassword = bcrypt.hash(password, saltRounds);

        return hashedPassword;
    }
}