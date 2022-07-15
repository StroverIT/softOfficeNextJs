import { connectMongo } from "../db/connectDb";

import Product from "../db/models/Product";

export const getAllProducts = () => {
  return Product.find({});
};
