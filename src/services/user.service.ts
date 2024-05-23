import { UploadedFile } from "express-fileupload";

import { ApiError } from "../api-error";
import { FileItemTypeEnum } from "../enums/file-item-type.enum";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";
import { s3Service } from "./s3.service";

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
  public async uploadAvatar(
    userId: string,
    avatar: UploadedFile,
  ): Promise<IUser> {
    const user = await this.findUserOrThrow(userId);

    if (user.avatar) {
      await s3Service.deleteFile(user.avatar);
    }

    const filePath = await s3Service.uploadFile(
      avatar,
      FileItemTypeEnum.USER,
      user._id,
    );

    return await userRepository.updateById(userId, { avatar: filePath });
  }

  public async deleteAvatar(userId: string): Promise<IUser> {
    const user = await this.findUserOrThrow(userId);

    if (!user.avatar) {
      await s3Service.deleteFile(user.avatar);
    }

    return await userRepository.updateById(userId, { avatar: null });
  }
}

export const userService = new UserService();
