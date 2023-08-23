export class CreateTodoDto{
    userId: number;
    name: string;
    done: boolean;
}

export class GetTodoParams{
    name?: string;
    done?: boolean;
    limit?: number;
    offset?: number;
}

export class UpdateTodoDto{
    name?: string;
    done?: boolean;
}