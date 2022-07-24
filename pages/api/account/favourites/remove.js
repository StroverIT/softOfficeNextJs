import { connectMongo } from "../../../../db/connectDb";

import Favourite from "../../../../db/models/Favourite";

async function handler(req, res) {
  try {
    const { ownerId, favId } = req.body;
    await connectMongo();

    res.json({ data });
  } catch (e) {
    console.log(e);
    res.status(400).json(e.error);
  }
}

export default handler;
