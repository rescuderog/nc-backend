import { Expose, Type } from "class-transformer";

/**
 * DTO for returning a user info.
 */
export class SelectUserDto {

    @Expose()
    readonly nombre: string;

    @Expose()
    readonly email: string;

    @Expose()
    readonly id: number;

}