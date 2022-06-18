import { Request } from "express";
import { Course, User } from "../entities";
import { courseRepository, userRepository } from "../repositories";
import mailerService from "./mailer.service";

class CourseUserService {
  createCourseUserService = async ({ decoded, params }: Request) => {
    const user: User = await userRepository.retrieve({ id: decoded.id });

    const course: Course = await courseRepository.retrieve({ id: params.id });

    user.courses.push(course);

    const userCourse = await userRepository.save(user);

    mailerService.sendEmail(user.email, user.firstName, course.courseName);

    return userCourse;
  };
}

export default new CourseUserService();
