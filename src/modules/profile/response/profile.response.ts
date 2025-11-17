import { Expose, Type } from "class-transformer";

export class ProfileResponse {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    email: string;

    @Expose()
    phoneNumber: string;

    @Expose()
    avatar: string;
} 