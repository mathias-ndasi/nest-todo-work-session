import Joi from "joi";

export class JoiRequestPayload {
    joiSchema: Joi.ObjectSchema<any>;
    data: any;
};
