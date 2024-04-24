import { ApiError } from "../api-error";
import { userRepository } from "../repositories/user.repository";
import { IUser } from "../user.interface";

class UserService {
  public async getList(): Promise<IUser[]> {
    return await userRepository.getList();
  }
  public async createUser(dto: Partial<IUser>): Promise<IUser> {
    return await userRepository.createUser(dto);
  }
  public async getUser(userId: number): Promise<IUser> {
    const user = await userRepository.getUser(userId);
    if (!user) {
      throw new ApiError("user not found", 404);
    }
    return user;
  }
  public async updateUser(userId: number, dto: Partial<IUser>): Promise<IUser> {
    const user = await userRepository.getUser(userId);
    if (!user) {
      throw new ApiError("user not found", 404);
    }
    return await userRepository.updateUser(userId, dto);
  }
  public async deleteUser(userId: number): Promise<void> {
    const user = await userRepository.getUser(userId);
    if (!user) {
      throw new ApiError("user not found", 404);
    }
    return await userRepository.deleteUser(userId);
  }
}

export const userService = new UserService();
