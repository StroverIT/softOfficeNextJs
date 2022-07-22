import { connectMongo } from "../../db/connectDb";
import mongoose from "mongoose";

import User from "../../db/models/User";

export default async function handler(req, res) {
  await connectMongo();
  const data = await User.findOne({
    email: req.body.email,
  }).select("-password -addresses -createdAt -isVerified");
  res.json(data);
  mongoose.connection.close();
}
