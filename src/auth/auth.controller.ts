import { Controller, Request, Post, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "./guards/local-auth.guard";

@Controller('auth')
export class AuthController {
    constructor() { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return req.user;
    }
}