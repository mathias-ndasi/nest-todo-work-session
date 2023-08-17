import { UserType } from "@prisma/client";

export class User {
    id: number;
    userType: UserType;
    dateCreated: Date;
    dateUpdated: Date;
    userProfileId: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
}
