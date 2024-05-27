import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    testUser: any;

    constructor(private jwtService: JwtService) {
        this.testUser = {
            userId: 1,
            username: 'test',
            password: 'test'
        };
    }

    async validateUser(username: string, password: string) {
        if (
            this.testUser.username == username &&
            this.testUser?.password === password
        ) {
            return { userId: this.testUser.userId, username: this.testUser.username }
        }

        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload, { secret: process.env.JWT_SECRET })
        };
    }
}