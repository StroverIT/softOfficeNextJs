import { connectMongo } from "../../../db/connectDb";
import User from "../../../db/models/User";
import Product from "../../../db/models/Product";

import { getToken } from "next-auth/jwt";
const secret = process.env.NEXTAUTH_SECRET;

async function handler(req, res) {
  try {
    const token = await getToken({ req, secret });

    if (!token) {
      throw {
        error: "Невалиден токън",
      };
    }

    await connectMongo();

    const user = await User.findOne({ email: token.email });

    if (!user || user.role != "admin") {
      throw {
        error: "Нямате такива права",
      };
    }

    const { data, productId } = req.body;

    await Product.updateOne({ _id: productId }, { $set: data });
    res.json({ message: "Успешно променихте продукта" });
  } catch (e) {
    res.json({ error: e?.error });
  }
}

export default handler;
