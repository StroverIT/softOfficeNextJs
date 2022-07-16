import { connectMongo } from "../db/connectDb";

import Product from "../db/models/Product";

export const getAllProducts = async (sectionName, filter) => {
  await connectMongo();

  return Product.find({ sectionName });
};
