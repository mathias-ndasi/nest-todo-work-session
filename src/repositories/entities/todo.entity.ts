import { Todo } from "@prisma/client";

export class SaveTodoParams{
    userId: number;
    name: string;
    done: boolean;
}

export class TodoFilterParams{
    id?: number;
    name?: string;
}

export class TodoFilterParamsWithLimits extends TodoFilterParams {
    limit: number;
    offset: number;
}

export class UpdateTodoParams{
    name?: string;
    done?: boolean;
}