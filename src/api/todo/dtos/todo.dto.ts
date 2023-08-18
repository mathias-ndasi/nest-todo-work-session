export class CreateTodoDto{
    name: string;
    done: boolean;
}

export class GetTodoParams{
    name: string;
    done: boolean;
}

export class UpdateTodoDto{
    name?: string;
    done?: boolean;
    user?: string;
}