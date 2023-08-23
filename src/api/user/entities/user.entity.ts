import { UserType } from "@prisma/client";


export class User {
    id: number;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    address: string;
    password: string;
    userType: UserType;
    dateCreated: Date;
    dateUpdated: Date;
}
