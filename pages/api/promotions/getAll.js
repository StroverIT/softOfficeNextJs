import { connectMongo } from "../../../db/connectDb";
import Promotion from "../../../db/models/Promotion";
import { ObjectId } from "mongodb";
const secret = process.env.NEXTAUTH_SECRET;

async function handler(req, res) {
  try {
    await connectMongo();
    const data = await Promotion.find({}).lean();
    res.json(data);
  } catch (e) {
    console.log(e);
    res.json({ error: e?.error });
  }
}

export default handler;
