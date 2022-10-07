import nodemailer from "nodemailer";
import { google } from "googleapis";

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
const sendEmail = async (fromEmail, email, subject, text) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
<<<<<<< HEAD
        user: process.env.EMAIL_SEND,
=======
        user: "emilzlatinov123@gmail.com",
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
    await transporter.sendMail({
      from: fromEmail,
      to: email,
      subject: subject,
      html: text,
    });
<<<<<<< HEAD
  } catch (error) {
    console.log(error);
  }
=======
  } catch (error) {}
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
};

export default sendEmail;
