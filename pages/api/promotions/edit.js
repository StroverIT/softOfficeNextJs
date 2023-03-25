import { connectMongo } from "../../../db/connectDb";
// Models
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

    const data = req.body;

    const product = await Product.findOne({ name: data.sectionName }).lean();
    let newData = product.subsection.map((subsection) => {
      if (subsection._id == data.subsectionId) {
        subsection.items = subsection.items.map((item) => {
          if (item._id == data.itemId) {
            return { ...item, ...data.inputs };
          }
          return item;
        });
      }
      return subsection;
    });
    const result = await Product.updateOne(
      { name: data.sectionName },
      { $set: { subsection: newData } }
    );
    await Promotion.updateOne(
      { "product.item._id": data.itemId },
      {
        $set: {
          "product.item.cena": data.inputs.cena,
          "product.item.promotionalPrice": data.inputs.promotionalPrice,
        },
      }
    );

    res.json({ message: "Успешно променихте продукта" });
  } catch (e) {
    console.log(e);
    res.json({ error: e?.error });
  }
}

export default handler;
