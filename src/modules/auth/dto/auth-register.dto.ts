import { z, ZodObject } from 'zod';

const authRegisterDto = z.object({
    name: z.string({
        required_error: 'Name tidak boleh kosong',
        invalid_type_error: 'Name harus string',
    }).min(2, 'Name harus terdiri dari 2 karakter'),
    email: z.string({
        required_error: 'Email tidak boleh kosong',
        invalid_type_error: 'Email harus string',
    }).email({
        message: 'Email must be valid', 
    }), 
    password: z.string({ 
        required_error: 'Password tidak boleh kosong',
        invalid_type_error: 'Password harus string',
    }).min(8, 'password harus terdiri dari 8 karakter'),
    phone_number: z.string({
        required_error: 'Phone number tidak boleh kosong',
        invalid_type_error: 'Phone number harus string',
    }).min(10, 'Phone number harus terdiri dari 10 digit'),
});

export class AuthRegisterDto {
    static schema: ZodObject<any> = authRegisterDto;
    constructor(
        public readonly email: string,
        public readonly name: string,
        public readonly phone_number: string,
        public readonly password: string
    ){}
} 