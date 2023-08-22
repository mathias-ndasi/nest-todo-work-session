import {
  SaveUserParams,
  UpdateUserParams,
  UserFilterParams,
  UserFilterParamsWithLimits,
} from '../entities/user.entity';

export interface IUserRepository {
  saveUser(params: SaveUserParams): Promise<any>;
  retrieveUser(params: UserFilterParams): Promise<any>;
  retrieveUsers(params: UserFilterParamsWithLimits): Promise<any>;
  updateUser(userId: number, params: UpdateUserParams): Promise<any>;
  deleteUser(userId: number): Promise<any>;
}
