import { config } from './../common/config';
import { HttpStatus } from '@nestjs/common';
import { JoiRequestPayload } from '../common/types/type';
import logger from './logger';
import { Response, ResponseWithoutData } from '../common/response';

export class JoiValidator {
  static validate(payload: JoiRequestPayload): Promise<ResponseWithoutData | null> {
    return new Promise(async (resolve, reject) => {
      try {
        const { error } = payload.joiSchema.validate(payload.data, config.joiOptions);

        return resolve(error
          ? Response.withoutData(
            HttpStatus.BAD_REQUEST,
            error.details[0].message
          )
          : null
        );
      } catch (error) {
        logger.error(`Error occurred while running joi validator: ${error}`);
        return reject(`Error occurred while running joi validator: ${error}`);
      }
    });
  }
}
