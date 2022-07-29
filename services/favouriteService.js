import { connectMongo } from "../db/connectDb";
import mongoose from "mongoose";

import Favourite from "../db/models/Favourite";

export const isFav = async (itemId, userId) => {
  await connectMongo();
  const data = await Favourite.findOne({ "product._id": itemId, userId });
  console.log(data);
  return data ? true : false;
};
