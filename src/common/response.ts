export class ResponseWithoutData {
    status: number;
    message: string;
    data?: any
}

export class ResponseWithData extends ResponseWithoutData {
    data: any;
}

export class Response {
    static withData(status: number, message: string, data: any): ResponseWithData {
        return { status, message, data };
    }

    static withoutData(status: number, message: string, data?: any): ResponseWithoutData {
        return { status, message, data };
    }
}
