import { Router } from "express";
import { coursesUsersController } from "../controllers";
import { validateToken } from "../middlewares";

const router = Router();

router.post(
  "/courses/:id/users",
  validateToken,
  coursesUsersController.createdCourseUserController
);

export default router;
