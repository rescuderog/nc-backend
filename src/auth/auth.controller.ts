import { Controller, Request, Post, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { AuthService } from "./auth.service";
import { Body } from "@nestjs/common";
import { SelectUserDto } from "src/db/dto/select-user.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async loginUser(@Body() loginInfo: SelectUserDto, @Request() req): Promise<Object> {
        return this.authService.login(req.user);
    }
}