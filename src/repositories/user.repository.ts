import { User } from "../models/user.model";
import { IUser } from "../user.interface";

class UserRepository {
  public async getList(): Promise<IUser[]> {
    return await User.find();
  }
  public async createUser(dto: Partial<IUser>): Promise<IUser> {
    return await User.create(dto);
  }
  public async getUser(userId: string): Promise<IUser> {
    return await User.findById(userId);
  }
  public async updateUser(userId: string, dto: Partial<IUser>): Promise<IUser> {
    return await User.findByIdAndUpdate(userId, dto, {
      returnDocument: "after",
    });
  }
  public async deleteUser(userId: string): Promise<void> {
    await User.deleteOne({ _id: userId });
  }
}

export const userRepository = new UserRepository();
