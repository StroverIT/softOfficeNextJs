// Mongoose
import { connectMongo } from "../../../../db/connectDb";
import mongoose from "mongoose";
// Models
import User from "../../../../db/models/User";
import Token from "../../../../db/models/Token";
// Mongode
import { ObjectId } from "mongodb";

// Validators
// import { emailVal } from "../../../../utils/validationHandler";

import sendEmail from "../../sendEmail";

async function handler(req, res) {
  //Connect with database
  if (req.method == "POST") {
    const { email } = req.body;
    await connectMongo();

    const user = await User.findOne({ email });

    // --- Validators
    if (!user) {
      return res
        .status(404)
        .json({ message: "Не е намерен такъв и-мейл", isErr: true });
    }
    if (user.isVerified) {
      return res
        .status(404)
        .json({ message: "Вече е потвърден акаунта!", isErr: true });
    }

    // --- If everything succeed

    // Create token

    let token = await Token.findOne({ userId: ObjectId(user._id) });
    if (!token) {
      token = await Token.create({
        userId: user._id,
        token: new ObjectId(),
      });
    }
    const message = `
      <h3>За потвърждаване на имейла в IvdaGeo.bg.
      </h2><a href="${process.env.NEXTAUTH_URL}/account/verifyAccountToken/${user._id}/${token.token}">Цъкнете тук</a>
      `;
    // Sending email
    await sendEmail(
      process.env.EMAIL_SEND,
      email,
      "Потвърждаване на и-мейла IvdaGeo",
      message
    );
    return res
      .status(201)
      .json({ message: "Успешно изпратена заявка", isErr: false });
  }
}
export default handler;
