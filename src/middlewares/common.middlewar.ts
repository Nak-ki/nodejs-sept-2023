import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../api-error";
import { postSchema, updateSchema } from "../schema/validators";

class CommonMiddleware {
  public isIdValid(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      if (!isObjectIdOrHexString(userId)) {
        throw new ApiError("Invalid id", 400);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
  public isBodyValid(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.method === "POST") {
        const { error } = postSchema.validate(req.body);
        if (error) {
          return res.status(400).json({ error: error.details[0].message });
        }
      } else if (req.method === "PUT") {
        const { error } = updateSchema.validate(req.body);
        if (error) {
          return res.status(400).json({ error: error.details[0].message });
        }
      }
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const commonMiddleware = new CommonMiddleware();
