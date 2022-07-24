// Mongodb
import { connectMongo } from "../../../../db/connectDb";
import mongoose from "mongoose";
import User from "../../../../db/models/User";
import Token from "../../../../db/models/Token";
import { ObjectId } from "mongodb";
// Validators
import { emailVal } from "../../../../utils/validationHandler";
import { hash } from "bcryptjs";

async function handler(req, res) {
  //Connect with database
  if (req.method == "POST") {
    await connectMongo();
    const errors = [];
    const { password, confPassword, token, userId } = req.body;

    const foundToken = await Token.findOne({ token });
    const user = await User.findById(userId);

    if (password != confPassword) {
      errors.push("Паролите трябва да съвпадат!");
    }

    if (!foundToken || foundToken?.userId != userId || !user) {
      errors.push("Невалиден токен");
    }

    // If are errors
    if (errors.length > 0) {
      return res.status(403).json({ errors });
    }

    user.password = await hash(password, 12);
    await user.save();
    await Token.deleteOne({ token });

    mongoose.connection.close();
    return res.status(201).json({ message: "Паролата беше сменена успешно!" });
  }
}
export default handler;
