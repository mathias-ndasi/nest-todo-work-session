import { User } from "../../.././api/user/entities/user.entity";


export class Todo{
    id: number;
    name: string;
    done: boolean;
    dateCreated: Date;
    dateUpdated: Date;
}