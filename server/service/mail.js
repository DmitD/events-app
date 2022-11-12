import nodemailer from "nodemailer";
import dotenv from "dotenv";

class MailService {
  constructor() {
    dotenv.config();
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "Activate your account on " + process.env.API_URL,
      text: "",
      html: `
            <div>
              <h1>Please click on the link to activate your account.</h1>
              <a href='${link}'>${link}</a>
            </div>
            `,
    });
  }
}

export default new MailService();
