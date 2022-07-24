import { connectMongo } from "../../../../db/connectDb";

import Delivery from "../../../../db/models/Delivery";

async function handler(req, res) {
  const ownerId = req.body.ownerId;

  await connectMongo();
  const data = await Delivery.find({ ownerId });
  res.json(data);
}

export default handler;
