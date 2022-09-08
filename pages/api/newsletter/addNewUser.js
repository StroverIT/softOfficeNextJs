import { connectMongo } from "../../../db/connectDb";
import mongoose from "mongoose";

import Newsletter from "../../../db/models/Newsletter";

async function handler(req, res) {
  await connectMongo();
  const { email } = req.body;
  try {
    const isFound = await Newsletter.findOne({ email });

    if (isFound) {
      throw {
        error: "Вече сте се записали",
      };
    }

    await Newsletter.create({ email });

    mongoose.connection.close();
    res.json({ message: "Успешно се записахте за бюлетина" });
  } catch (error) {
    mongoose.connection.close();

    res.status(400).json(error);
  }
}
export default handler;
