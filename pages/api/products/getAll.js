import { connectMongo } from "../../../db/connectDb";

import Product from "../../../db/models/Product";

async function handler(req, res) {
  await connectMongo();

  try {
    const productData = await Product.find({});
    res.json(productData);
  } catch (e) {
    console.log(e);
  }
}

export default handler;
