import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../api-error";

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
  public isBodyValid(validator: ObjectSchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        req.body = await validator.validateAsync(req.body);
        next();
      } catch (e) {
        next(e);
      }
    };

    // if (req.method === "POST") {
    //   const { error } = postSchema.validate(req.body);
    //   if (error) {
    //     return res.status(400).json({ error: error.details[0].message });
    //   }
    // } else if (req.method === "PUT") {
    //   const { error } = updateSchema.validate(req.body);
    //   if (error) {
    //     return res.status(400).json({ error: error.details[0].message });
    //   }
    // }
  }
}

export const commonMiddleware = new CommonMiddleware();
