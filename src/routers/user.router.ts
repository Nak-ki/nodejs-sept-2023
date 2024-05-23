// import { Router } from "express";
//
// import { userController } from "../controllers/user.controller";
// import { authMiddleware } from "../middlewares/auth.middlewar";
// import { commonMiddleware } from "../middlewares/common.middlewar";
// import { UserValidator } from "../validators/user.validator";
//
// const router = Router();
// router.get("/", userController.getList);
//
// router.get("/:id", commonMiddleware.isIdValid, userController.getUser);
// router.put(
//   "/:id",
//   authMiddleware.checkAccessToken,
//   commonMiddleware.isBodyValid(UserValidator.update),
//   commonMiddleware.isIdValid,
//   userController.updateUser,
// );
// router.delete("/:id", commonMiddleware.isIdValid, userController.deleteUser);
//
// export const userRouter = router;

import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middlewar";
import { commonMiddleware } from "../middlewares/common.middlewar";
import { fileMiddleware } from "../middlewares/file.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get("/", userController.getList);

router.get("/me", authMiddleware.checkAccessToken, userController.getMe);

router.put(
  "/me",
  authMiddleware.checkAccessToken,
  commonMiddleware.isBodyValid(UserValidator.update),
  userController.updateMe,
);

router.delete("/me", authMiddleware.checkAccessToken, userController.deleteMe);

router.get("/:id", commonMiddleware.isIdValid, userController.getUser);

router.post(
  "/me/avatar",
  authMiddleware.checkAccessToken,
  fileMiddleware.isAvatarValid,
  userController.uploadAvatar,
);

router.delete(
  "/me/avatar",
  authMiddleware.checkAccessToken,
  userController.deleteAvatar,
);

export const userRouter = router;
