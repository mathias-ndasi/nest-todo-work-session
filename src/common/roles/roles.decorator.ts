import { SetMetadata } from '@nestjs/common';
import { UserType } from '../enums/constants.enum';

export const ROLES_KEY = 'userTypes';
export const Roles = (...userTypes: UserType[]) => SetMetadata(ROLES_KEY, userTypes);
