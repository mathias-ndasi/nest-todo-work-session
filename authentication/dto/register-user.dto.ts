import { IsString, Length } from "class-validator";


export class RegisterusersDto{
    @IsString()
    @Length(5,10)
    firstName: string;

    @IsString()
    @Length(5,10)
    lastName: string;

    @IsString()
    @Length(6,10)
    password: string;

    @IsString()
    @Length(5,10)
    email: string;
}