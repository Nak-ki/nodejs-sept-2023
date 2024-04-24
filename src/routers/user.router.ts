import { Router } from "express";

import { userController } from "../controllers/user.controller";

const router = Router();
router.get("/", userController.getList);
router.post("/", userController.createUser);
router.get("/:id", userController.getUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export const userRouter = router;
