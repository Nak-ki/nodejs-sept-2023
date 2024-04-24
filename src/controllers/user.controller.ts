import { NextFunction, Request, Response } from "express";

import { userService } from "../services/user.service";
import { IUser } from "../user.interface";

class UserController {
  public async getList(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getList();
      res.json(users);
    } catch (e) {
      next(e);
    }
  }
  public async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as Partial<IUser>;
      const newUser = await userService.createUser(dto);
      res.status(201).json(newUser);
    } catch (e) {
      next(e);
    }
  }
  public async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.params.userId);
      const user = userService.getUser(userId);
      res.json(user);
    } catch (e) {
      next(e);
    }
  }
  public async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.params.userId);
      const dto = req.body as Partial<IUser>;
      const user = userService.updateUser(userId, dto);
      res.status(201).json(user);
    } catch (e) {
      next(e);
    }
  }
  public async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.params.userId);
      await userService.deleteUser(userId);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
