import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
    testUser: any;

    constructor() {
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
}