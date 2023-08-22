import { User } from "@prisma/client";


export class Todo{
    id: number;
    name: string;
    done: boolean;
    dateCreated: Date;
    dateUpdated: Date;
}