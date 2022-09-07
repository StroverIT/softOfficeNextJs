import { connectMongo } from "../../../db/connectDb";
import User from "../../../db/models/User";
import Product from "../../../db/models/Product";
import Promotion from "../../../db/models/Promotion";
import { ObjectId } from "mongodb";
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

    const { data, indexes } = req.body;
    const productEdit = await Product.updateOne(
      { "subsection.items._id": ObjectId(data.item._id) },
      {
        $set: {
          [`subsection.$[i].items.${indexes.itemIdx}.isOnPromotions`]: true,
          [`subsection.$[i].items.${indexes.itemIdx}.promotionalPrice`]:
            data.item.promotionalPrice,
        },
      },
      {
        arrayFilters: [{ "i.items._id": { $eq: ObjectId(data.item._id) } }],
      }
    );
    const promo = await Promotion.create({ product: data });
    res.json({ message: "Успешно променихте продукта" });
  } catch (e) {
    console.log(e);
    res.json({ error: e?.error });
  }
}

export default handler;
