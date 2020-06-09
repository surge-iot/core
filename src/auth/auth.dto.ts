import { IsNotEmpty, IsEmail } from 'class-validator';

export class RegisterDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}

export class LoginDto {
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}
