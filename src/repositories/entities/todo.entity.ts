import { Todo } from "@prisma/client";

export class SaveTodoParams{
    name: string;
    done: boolean;
}

export class TodoFilterParams{
    name?: string;
}

export class UpdateTodoParams{
    name?: string;
    done?: boolean;
}