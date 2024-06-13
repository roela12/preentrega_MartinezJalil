import mailer from "nodemailer";
import { entorno } from "../config/dotenv.config.js";

export default class MailingService {
  constructor() {
    //logica a implementar
    this.client = mailer.createTransport({
      service: entorno.mailing_service,
      host: entorno.mailing_host,
      port: 587,
      auth: {
        user: entorno.mailing_user,
        pass: entorno.mailing_password,
      },
    });
  }

  sendSimpleMail = async ({ from, to, subject, html, attachments = [] }) => {
    let result = await this.client.sendMail({
      from,
      to,
      subject,
      html,
      attachments,
    });
    return result;
  };
}
