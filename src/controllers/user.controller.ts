import { NextFunction, Request, Response } from "express";

import { IUser } from "../interfaces/user.interface";
import { userService } from "../services/user.service";

class UserController {
  public async getList(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getList();
      res.json(users);
    } catch (e) {
      next(e);
    }
  }
  public async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      const user = await userService.getUser(userId);
      res.json(user);
    } catch (e) {
      next(e);
    }
  }
  public async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      const dto = req.body as Partial<IUser>;
      const user = await userService.updateUser(userId, dto);
      res.status(201).json(user);
    } catch (e) {
      next(e);
    }
  }
  public async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      await userService.deleteUser(userId);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
