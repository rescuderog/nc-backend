import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "src/db/dto/create-user.dto";

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get()
    async getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Post('register')
    async createUser(@Body() data: CreateUserDto) {
        return this.userService.createUser(data);
    }
}