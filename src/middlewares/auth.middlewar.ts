import { NextFunction, Request, Response } from "express";

import { ApiError } from "../api-error";
import { errorMessages } from "../constants/error-messages.constant";
import { statusCodes } from "../constants/status-codes.constant";
import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { TokenTypeEnum } from "../enums/token-type.enum";
import { actionTokenRepository } from "../repositories/action-token.repository";
import { tokenRepository } from "../repositories/token.repository";
import { tokenService } from "../services/token.service";

class AuthMiddleware {
  public checkAccessToken(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = req.get("Authorization");
      if (!accessToken) {
        throw new ApiError("No token provided", 401);
      }
      const payload = tokenService.checkToken(
        accessToken,
        TokenTypeEnum.ACCESS,
      );
      const tokenPair = tokenRepository.findByParams({ accessToken });
      if (!tokenPair) {
        throw new ApiError("Invalid token", 401);
      }

      req.res.locals.jwtPayload = payload;

      next();
    } catch (e) {
      next(e);
    }
  }
  public checkRefreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.get("Authorization");
      if (!refreshToken) {
        throw new ApiError("No token provided", 401);
      }
      const payload = tokenService.checkToken(
        refreshToken,
        TokenTypeEnum.REFRESH,
      );
      const tokenPair = tokenRepository.findByParams({ refreshToken });
      if (!tokenPair) {
        throw new ApiError("Invalid token", 401);
      }

      req.res.locals.jwtPayload = payload;
      req.res.locals.tokenPair = tokenPair;

      next();
    } catch (e) {
      next(e);
    }
  }
  public checkActionToken(type: ActionTokenTypeEnum, key = "token") {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const actionToken = req.query[key] as string;
        if (!actionToken) {
          throw new ApiError(
            errorMessages.NO_TOKEN_PROVIDER,
            statusCodes.BAD_REQUEST,
          );
        }
        const payload = tokenService.checkActionToken(actionToken, type);

        const entity = await actionTokenRepository.findByParams({
          actionToken,
        });
        if (!entity) {
          throw new ApiError(
            errorMessages.INVALID_TOKEN,
            statusCodes.UNAUTHORIZED,
          );
        }
        req.res.locals.jwtPayload = payload;
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const authMiddleware = new AuthMiddleware();
