import { connectMongo } from "../../../db/connectDb";
import mongoose from "mongoose";
<<<<<<< HEAD
import { ObjectId } from "mongodb";
=======
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
import User from "../../../db/models/User";

import { fullNameVal, emailVal } from "../../../utils/validationHandler";
import { hash } from "bcryptjs";
<<<<<<< HEAD
import Token from "../../../db/models/Token";
import sendEmail from "../sendEmail";
=======
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e

async function handler(req, res) {
  //Only POST mothod is accepted
  if (req.method === "POST") {
    //Getting email and password from body
    const { email, password, repeatPassword, fullName } = req.body;
    const errors = [];
    //Validate
    if (!email || !password) {
      errors.push("Всички полета трябва да бъдат попълнени");
<<<<<<< HEAD
=======
      return;
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
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
<<<<<<< HEAD

=======
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
    if (checkExisting) {
      errors.push("Вече съществува такъв и-мейл");
    }

    if (errors.length > 0) {
      mongoose.connection.close();
      return res.status(406).json(errors);
    }

<<<<<<< HEAD
    const user = await User.create({
=======
    const status = await User.create({
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
      email,
      password: await hash(password, 12),
      fullName,
    });
<<<<<<< HEAD

    let token = await Token.findOne({ userId: ObjectId(user._id) });
    if (!token) {
      token = await Token.create({
        userId: user._id,
        token: new ObjectId(),
      });
    }
    const message = `
      <h3>За потвърждаване на имейла в SoftOffice.bg.
      </h2><a href="${process.env.HOST_URL}/account/verifyAccountToken/${user._id}/${token.token}">Цъкнете тук</a>
      `;
    // Sending email
    await sendEmail(
      process.env.EMAIL_SEND,
      email,
      "Потвърждаване на и-мейла SoftOffice",
      message
    );
    return res
      .status(201)
      .json({ message: "Успешно изпратена заявка", isErr: false });
    //Send success response
=======
    //Send success response
    res.status(201).json({ message: "success", ...status });
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
    //Close DB connection
    mongoose.connection.close();
  } else {
    //Response for other than POST method
    mongoose.connection.close();

    res.status(500).json({ message: "Нещо се обърка..." });
  }
}

export default handler;
