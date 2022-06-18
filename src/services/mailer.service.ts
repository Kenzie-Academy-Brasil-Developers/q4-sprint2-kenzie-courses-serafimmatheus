import hbs, {
  NodemailerExpressHandlebarsOptions,
} from "nodemailer-express-handlebars";
import path from "path";
import { transport } from "../configs/index";
import { ErrorHandler } from "../errors/errors";

class MailerService {
  sendEmail = (email: string, nameUser: string, courseName: string) => {
    const mailOptions = {
      from: "matheus18serafim@gmail.com",
      to: email,
      subject: "Testando Node Mailer Com Template",
      template: "email",
      context: {
        name: nameUser,
        company: "Kenzie Academy",
        course: courseName,
      },
    };

    const handlebarOptions: NodemailerExpressHandlebarsOptions = {
      viewEngine: {
        partialsDir: path.resolve("./src/views/"),
        defaultLayout: false,
      },
      viewPath: path.resolve("./src/views/"),
    };

    transport.use("compile", hbs(handlebarOptions));

    transport.sendMail(mailOptions, (err) => {
      if (err) {
        throw new ErrorHandler(424, "Email could not be send!");
      }
    });
  };
}

export default new MailerService();
