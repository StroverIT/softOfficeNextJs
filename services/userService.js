import { connectMongo } from "../db/connectDb";
import mongoose from "mongoose";

import User from "../db/models/User";

export const getFullData = async (session) => {
  await connectMongo();
  const data = await User.findOne({
    email: session.email,
  })
    .select("-createdAt -isVerified -password")
    .lean();
  mongoose.connection.close();
  return data;
};
