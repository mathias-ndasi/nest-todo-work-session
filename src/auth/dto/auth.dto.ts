import { UserType } from "src/common/enums/constants.enum";

export class AuthUserParams {
  email?: string;
  username?: string;
  password?: string;
  userType?: UserType;
}
