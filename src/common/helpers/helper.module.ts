import { Module } from "@nestjs/common";
import { UserHelper } from "./user.helper";

@Module({
    providers: [UserHelper],
    exports: [UserHelper],
})
export class HelperModule{}