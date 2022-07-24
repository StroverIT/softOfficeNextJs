import { connectMongo } from "../../../../db/connectDb";

import Favourite from "../../../../db/models/Favourite";
import User from "../../../../db/models/User";

import { getToken } from "next-auth/jwt";
const secret = process.env.NEXTAUTH_SECRET;

async function handler(req, res) {
  try {
    const { product } = req.body;

    if (!product) {
      throw {
        error: "Вече не е наличен продукта",
      };
    }
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

    const isAdded = await Favourite.findOne({
      "product._id": product._id,
      ownerId: user._id,
    });

    if (isAdded) {
      throw {
        error: "Вече сте сложили продукта във фаворити",
      };
    }

    await Favourite.create({ product, ownerId: user._id });
    res.json({ message: "Успешно добавихте във фаворити" });
  } catch (e) {
    console.log(e);
    res.status(400).json(e.error);
  }
}

export default handler;
