import { connectMongo } from "../db/connectDb";
import Delivery from "../db/models/Delivery";

export const getAll = async () => {
  await connectMongo();

  return Delivery.find({});
};
