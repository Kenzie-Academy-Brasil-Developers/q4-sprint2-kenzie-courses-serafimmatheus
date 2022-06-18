import { Express } from "express";
import courseRouter from "./course.route";
import userRouter from "./user.route";
import courseUserRouter from "./course_user.route";

const registerRouters = (app: Express): void => {
  app.use(userRouter);
  app.use(courseRouter);
  app.use(courseUserRouter);
};

export default registerRouters;
