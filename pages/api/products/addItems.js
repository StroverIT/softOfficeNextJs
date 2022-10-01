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

    const { data, section, subsection } = req.body;

    const formatedData = data.map((item) => {
      return { ...item, tipove: item.tipove.split("\n").join(";") };
    });
    const res = await Product.updateOne(
      { name: section.name, "subsection._id": subsection.id },
      { $push: { "subsection.$[i].items": { $each: formatedData } } },
      { arrayFilters: [{ "i._id": { $eq: subsection.id } }] }
    );

    console.log(subsection, res);
    res.json({ message: "Успешно променихте продукта" });
  } catch (e) {
    res.json({ error: e?.error });
  }
}

export default handler;
