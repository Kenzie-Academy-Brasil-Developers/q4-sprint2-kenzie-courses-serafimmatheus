import { Request, Response } from "express";
import hbs, {
  NodemailerExpressHandlebarsOptions,
} from "nodemailer-express-handlebars";
import path from "path";
import { transport } from "../configs";
import { coursesusersServices } from "../services";

class CourseUserController {
  createdCourseUserController = async (req: Request, res: Response) => {
    const createdUserCourse =
      await coursesusersServices.createCourseUserService(req);

    return res
      .status(201)
      .json({ message: "Email de inscrição enviado com sucesso." });
  };
}

export default new CourseUserController();
