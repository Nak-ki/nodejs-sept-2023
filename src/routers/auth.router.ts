import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middlewar";
import { commonMiddleware } from "../middlewares/common.middlewar";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.post(
  "/sign-up",
  commonMiddleware.isBodyValid(UserValidator.create),
  authController.signUp,
);
router.post(
  "/sign-in",
  // commonMiddleware.isBodyValid(UserValidator.create),
  authController.signIn,
);
router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refresh,
);
router.post(
  "/forgot-password",
  commonMiddleware.isBodyValid(UserValidator.forgotPassword),
  authController.forgotPassword,
);
router.put(
  "/forgot-password",
  commonMiddleware.isBodyValid(UserValidator.setForgotPassword),
  authMiddleware.checkActionToken,
  authController.setForgotPassword,
);

export const authRouter = router;
