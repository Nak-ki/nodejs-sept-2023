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
  public async getUser(userId: string): Promise<IUser> {
    return await this.findUserOrThrow(userId);
  }
  public async updateUser(userId: string, dto: Partial<IUser>): Promise<IUser> {
    await this.findUserOrThrow(userId);
    return await userRepository.updateUser(userId, dto);
  }
  public async deleteUser(userId: string): Promise<void> {
    await this.findUserOrThrow(userId);
  }

  private async findUserOrThrow(userId: string): Promise<IUser> {
    const user = await userRepository.getUser(userId);
    if (!user) {
      throw new ApiError("user not found", 404);
    }
    return user;
  }
}

export const userService = new UserService();
