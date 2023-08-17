export class CreateUserDTO {
    email: string;
    username: string;
    password: string;
    userType: string;
    firstName: string;
    lastName: string;
    address: string;
}

export class GetUserParams {
    email: string;
    username: string;
    userType: string;
}

export class UpdateUserDTO {
    email?: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    username?: string;
    userType?: string;
}
