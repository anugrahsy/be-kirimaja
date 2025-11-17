import { Expose, Type } from "class-transformer";

export class RoleResponse {
    @Expose()
    id: number;

    @Expose()
    key: string;

    @Expose()
    name: string;

    @Expose()
    @Type(() => PermissionResponse)
    permissions: PermissionResponse[]; 
}

class PermissionResponse {
    @Expose()
    id: number;

    @Expose()
    key: string;

    @Expose()
    name: string;

    @Expose()
    resource: string;
}

export class UserResponse {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    avatar: string;
    
    @Expose()    
    email: string;
    
    @Expose() 
    phoneNumber: string;
    
    @Expose()
    @Type(() => RoleResponse)
    role: RoleResponse[];  
}

export class AuthLoginResponse {
    @Expose()
    accessToken: string;

    @Expose()
    @Type(() => UserResponse)
    user: UserResponse;
}