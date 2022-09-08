import { connectMongo } from "../../../../db/connectDb";

import Favourite from "../../../../db/models/Favourite";
import User from "../../../../db/models/User";

import { getToken } from "next-auth/jwt";
const secret = process.env.NEXTAUTH_SECRET;

async function handler(req, res) {
  try {
    const { productId } = req.body;

    await connectMongo();

    const token = await getToken({ req, secret });

    if (!token) {
      throw {
        error: "Невалиден токън",
      };
    }
    const user = await User.findOne({ email: token.email });

    if (!user) {
      throw {
        error: "Невалиден акаунт",
      };
    }
    await Favourite.deleteOne({ "product._id": productId, userId: user._id });
    res.json({ message: "Успешно премахнахте от любими" });
  } catch (e) {
    res.status(400).json(e);
  }
}

export default handler;
