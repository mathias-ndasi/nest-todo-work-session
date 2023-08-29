import { SetMetadata } from '@nestjs/common';
import { UserType } from '../enums/constants.enum';

export const ROLES_KEY = 'role';
export const Role = (role: UserType) => SetMetadata(ROLES_KEY, role);
