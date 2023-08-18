import { UserType } from "../../../common/enums/constants.enum";


export class User {
    id: number;
    email: string;
    password: string;
    userType: UserType;
    dateCreated: Date;
    dateUpdated: Date;
}
