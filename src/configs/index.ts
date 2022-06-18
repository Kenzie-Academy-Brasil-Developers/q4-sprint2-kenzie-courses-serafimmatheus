import nodemailer from "nodemailer";
import * as dotenv from "dotenv";

dotenv.config();

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASWORD,
  },
});

export { transport };
