import { connectMongo } from "../db/connectDb";

import Product from "../db/models/Product";
export const getAllProducts = async (sectionName, filter) => {
  await connectMongo();
  // for case insensitive
  return Product.findOne({
    sectionName: {
      $regex: new RegExp(sectionName, "i"),
    },
  });
};
