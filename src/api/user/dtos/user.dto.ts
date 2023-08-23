import { UserType } from "@prisma/client";

export class CreateUserDTO {
    email: string;
    username: string;
    password: string;
    userType: string;
    firstName: string;
    lastName: string;
    address: string;
}

export class GetUsersParams {
    email?: string;
    username?: string;
    userType?: UserType;
    limit?: number;
    offset?: number;
}

export class UpdateUserDTO {
    email?: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    username?: string;
    userType?: UserType;
    password?: string;
}

