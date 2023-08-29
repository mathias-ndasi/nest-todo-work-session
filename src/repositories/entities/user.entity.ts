import { UserType } from '@prisma/client';

export class SaveUserParams {
  username: string;
  email: string;
  userType: UserType;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
}

export class UserFilterParams {
  id?: number;
  username?: string;
  email?: string;
  userType?: UserType;
}

export class UserFilterParamsWithLimits extends UserFilterParams {
  limit: number;
  offset: number;
}

export class UpdateUserParams {
  username?: string;
  email?: string;
  userType?: UserType;
  password?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
}
