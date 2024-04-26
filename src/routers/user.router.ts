import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middlewares/common.middlewar";

const router = Router();
router.get("/", userController.getList);
router.post("/", commonMiddleware.isBodyValid, userController.createUser);
router.get("/:id", commonMiddleware.isIdValid, userController.getUser);
router.put(
  "/:id",
  commonMiddleware.isIdValid,
  commonMiddleware.isBodyValid,
  userController.updateUser,
);
router.delete("/:id", commonMiddleware.isIdValid, userController.deleteUser);

export const userRouter = router;
