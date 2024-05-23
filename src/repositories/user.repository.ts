import { IUser } from "../interfaces/user.interface";
import { Token } from "../models/token.model";
import { User } from "../models/user.model";

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
  public async updateById(id: string, dto: Partial<IUser>): Promise<IUser> {
    return await User.findByIdAndUpdate(id, dto, {
      returnDocument: "after",
    });
  }
  public async deleteUser(userId: string): Promise<void> {
    await User.deleteOne({ _id: userId });
  }
  public async getByParams(params: Partial<IUser>): Promise<IUser> {
    return await User.findOne(params);
  }
  public async findWithOutActivityAfter(date: Date): Promise<IUser[]> {
    return await User.aggregate([
      {
        $lookup: {
          from: Token.collection.name,
          let: { userId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$_userId", "$$userId"] } } },
            { $match: { createdAt: { $gt: date } } },
          ],
          as: "tokens",
        },
      },
      {
        $match: { tokens: { $size: 0 } },
      },
      {
        $project: {
          _id: 1,
          email: 1,
          name: 1,
        },
      },
    ]);
  }
}

export const userRepository = new UserRepository();
