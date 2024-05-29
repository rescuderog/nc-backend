import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from 'bcrypt';
import { plainToClass } from "class-transformer";
import { SelectUserDto } from "src/db/dto/select-user.dto";

@Injectable()
export class AuthService {
    testUser: any;

    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService
    ) { }

    async checkUserCreds(username: string, password: string): Promise<SelectUserDto> {
        const userCheck = await this.prisma.cliente.findUnique({
            where: {
                email: username
            }
        });

        if (userCheck && await bcrypt.compare(password, userCheck.password)) {
            return plainToClass(SelectUserDto, userCheck, { excludeExtraneousValues: true })
        } else {
            return null;
        }
    }

    async validateUser(username: string, password: string): Promise<SelectUserDto> {
        const checkUserCreds = this.checkUserCreds(username, password);
        if (checkUserCreds) {
            return checkUserCreds;
        } else {
            return null;
        }
    }

    async login(user: SelectUserDto) {
        const payload = { username: user.email, sub: user.id, nombre: user.nombre };
        return {
            access_token: this.jwtService.sign(payload, { secret: process.env.JWT_SECRET })
        };
    }
}