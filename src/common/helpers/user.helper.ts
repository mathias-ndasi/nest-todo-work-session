import { Injectable } from "@nestjs/common";
import { config } from "../config";
const bcrypt = require('bcrypt');

@Injectable()
export class UserHelper {
    async hashPassword(password: string): Promise<string> {
        try {
            const hashPassword = await bcrypt.hash(password, config.bcryptHashRound);
            return hashPassword;
        } catch(error){
            throw new Error(`An error occurred when hashing passord: ${error}`);
        }
    }
}