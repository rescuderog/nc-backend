import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
    @IsOptional()
    nombre: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}