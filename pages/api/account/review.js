import { connectMongo } from "../../../db/connectDb";

import Review from "../../../db/models/Review";
import User from "../../../db/models/User";

import { getToken } from "next-auth/jwt";
const secret = process.env.NEXTAUTH_SECRET;

async function handler(req, res) {
  try {
    const { stars, comment } = req.body;

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
    const resData = await Review.create({
      stars,
      comment,
      name: user.fullName,
      image: token.picture || null,
    });
    res.json({ message: "Успешно" });
  } catch (e) {
    res.status(400).json(e);
  }
}

export default handler;
