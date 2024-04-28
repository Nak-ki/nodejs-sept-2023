import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middlewares/common.middlewar";
import { UserValidator } from "../validators/user.validator";

const router = Router();
router.get("/", userController.getList);
router.post(
  "/",
  commonMiddleware.isBodyValid(UserValidator.create),
  userController.createUser,
);
router.get("/:id", commonMiddleware.isIdValid, userController.getUser);
router.put(
  "/:id",
  commonMiddleware.isBodyValid(UserValidator.update),
  commonMiddleware.isIdValid,
  userController.updateUser,
);
router.delete("/:id", commonMiddleware.isIdValid, userController.deleteUser);

export const userRouter = router;
