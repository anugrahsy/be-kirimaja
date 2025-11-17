import { z, ZodObject } from 'zod';

const authLoginDto = z.object({
    email: z.string({
        required_error: 'Email tidak boleh kosong',
        invalid_type_error: 'Email harus string',
    }).email({
        message: 'Email must be valid', 
    }),
    password: z.string({
        required_error: 'Password tidak boleh kosong',
        invalid_type_error: 'Password harus string',
    }).min(8, 'password harus terdiri dari 8 karakter')
});

export class AuthLoginDto {
    static schema: ZodObject<any> = authLoginDto;
    constructor(
        public readonly email: string,
        public readonly password: string
    ){}
} 