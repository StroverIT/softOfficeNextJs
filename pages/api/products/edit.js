import { connectMongo } from "../../../db/connectDb";
import User from "../../../db/models/User";
import Product from "../../../db/models/Product";
import Promotion from "../../../db/models/Promotion";

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

    data.subsection.forEach((subSec) => {
      subSec.items.forEach(async (item) => {
        if (item.isOnPromotions === true) {
          const promo = await Promotion.findOne({
            "product.item._id": item._id,
          });
          if (promo) {
            await Promotion.updateOne(
              { _id: promo._id },
              { $set: { "product.item.cena": item.cena } }
            );
          }
        }
      });
    });
    // await Product.updateOne({ _id: productId }, { $set: data });
    res.json({ message: "Успешно променихте продукта" });
  } catch (e) {
    res.json({ error: e?.error });
  }
}

export default handler;
