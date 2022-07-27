import { connectMongo } from "../../../db/connectDb";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import User from "../../../db/models/User";

import { fullNameVal, emailVal } from "../../../utils/validationHandler";
import { hash } from "bcryptjs";
import Token from "../../../db/models/Token";
import sendEmail from "../sendEmail";

async function handler(req, res) {
  //Only POST mothod is accepted
  if (req.method === "POST") {
    //Getting email and password from body
    const { email, password, repeatPassword, fullName } = req.body;
    const errors = [];
    //Validate
    if (!email || !password) {
      errors.push("Всички полета трябва да бъдат попълнени");
      return;
    }

    const fullNameCheck = fullNameVal(fullName);
    const emailCheck = emailVal(email);
    if (!fullNameCheck.result) errors.push(fullNameCheck.message);
    if (!emailCheck.result) errors.push(emailCheck.message);
    if (password != repeatPassword) errors.push("Паролите трябва да съвпадат");

    //Connect with database
    await connectMongo();
    //Check existing
    const checkExisting = await User.findOne({ email });
    //Send error response if duplicate user is found

    if (checkExisting) {
      errors.push("Вече съществува такъв и-мейл");
    }

    if (errors.length > 0) {
      mongoose.connection.close();
      return res.status(406).json(errors);
    }

    const user = await User.create({
      email,
      password: await hash(password, 12),
      fullName,
    });

    let token = await Token.findOne({ userId: ObjectId(user._id) });
    if (!token) {
      token = await Token.create({
        userId: user._id,
        token: new ObjectId(),
      });
    }
    const message = `
      <h3>За потвърждаване на имейла в IvdaGeo.bg.
      </h2><a href="${process.env.HOST_URL}/account/verifyAccountToken/${user._id}/${token.token}">Цъкнете тук</a>
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
    //Send success response
    //Close DB connection
    mongoose.connection.close();
  } else {
    //Response for other than POST method
    mongoose.connection.close();

    res.status(500).json({ message: "Нещо се обърка..." });
  }
}

export default handler;
