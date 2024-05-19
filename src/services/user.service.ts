import { ApiError } from "../api-error";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getList(): Promise<IUser[]> {
    return await userRepository.getList();
  }
  public async getUser(userId: string): Promise<IUser> {
    return await this.findUserOrThrow(userId);
  }
  public async updateMe(userId: string, dto: Partial<IUser>): Promise<IUser> {
    await this.findUserOrThrow(userId);
    return await userRepository.updateUser(userId, dto);
  }
  public async deleteMe(id: string): Promise<void> {
    await this.findUserOrThrow(id);
    await userRepository.updateById(id, { isDeleted: true });
  }
  public async findMe(id: string): Promise<IUser> {
    return await this.findUserOrThrow(id);
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
