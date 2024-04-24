import fs from "node:fs/promises";
import path from "node:path";

import { IUser } from "../user.interface";

const filePath = path.join(process.cwd(), "db.json");

class UserRepository {
  private reader = async (): Promise<IUser[]> => {
    const users = await fs.readFile(filePath, "utf-8");
    return JSON.parse(users);
  };

  private writer = async (users: IUser[]): Promise<void> => {
    await fs.writeFile(filePath, JSON.stringify(users));
  };
  public async getList(): Promise<IUser[]> {
    return await this.reader();
  }
  public async createUser(dto: Partial<IUser>): Promise<IUser> {
    const { name, email, password } = dto;

    const users = await this.reader();

    const newUser: IUser = {
      id: users[users.length - 1].id + 1,
      name,
      email,
      password,
    };
    console.log(name, email, password);
    users.push(newUser);
    await this.writer(users);
    return newUser;
  }
  public async getUser(userId: number): Promise<IUser> {
    const users = await this.reader();

    return users.find((user) => user.id === userId);
  }
  public async updateUser(userId: number, dto: Partial<IUser>): Promise<IUser> {
    const { name, email, password } = dto;
    const users = await this.reader();
    const index = users.findIndex((user) => user.id === userId);
    users[index] = { ...users[index], name, email, password };
    await this.writer(users);
    return users[index];
  }
  public async deleteUser(userId: number): Promise<void> {
    const users = await this.reader();

    const index = users.findIndex((user) => user.id === userId);
    users.splice(index, 1);
    await this.writer(users);
  }
}

export const userRepository = new UserRepository();
