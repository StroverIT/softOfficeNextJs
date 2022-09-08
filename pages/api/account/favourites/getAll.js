import { connectMongo } from "../../../../db/connectDb";

import Favourite from "../../../../db/models/Favourite";

async function handler(req, res) {
  try {
    const ownerId = req.body.ownerId;
    await connectMongo();

    const data = await Favourite.find({ ownerId });
    res.json({ data });
  } catch (e) {
    console.log(e);
    res.status(400).json(e.error);
  }
}

export default handler;
