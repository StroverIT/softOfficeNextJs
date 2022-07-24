import { connectMongo } from "../../../db/connectDb";
import mongoose from "mongoose";
import User from "../../../db/models/User";

import { fullNameVal, emailVal } from "../../../utils/validationHandler";
import { hash } from "bcryptjs";

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

    const status = await User.create({
      email,
      password: await hash(password, 12),
      fullName,
    });
    //Send success response
    res.status(201).json({ message: "success", ...status });
    //Close DB connection
    mongoose.connection.close();
  } else {
    //Response for other than POST method
    mongoose.connection.close();

    res.status(500).json({ message: "Нещо се обърка..." });
  }
}

export default handler;
