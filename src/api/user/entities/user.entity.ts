import { UserType } from "../../../common/enums/constants.enum";

export class UserProfile {
    id: number;
    userId: number;
    firstName: string;
    lastName: string;
    address: string;
    dateCreated: Date;
    dateUpdated: Date;
}

export class User {
    id: number;
    email: string;
    password: string;
    userType: UserType;
    dateCreated: Date;
    dateUpdated: Date;
    userProfile: UserProfile;
}
