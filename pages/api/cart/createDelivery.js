import Delivery from "../../../db/models/Delivery";
import User from "../../../db/models/User";

import { connectMongo } from "../../../db/connectDb";

import { getToken } from "next-auth/jwt";
const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(req, res) {
  const { cart, formData, totalPrice } = req.body;

  try {
    await connectMongo();

    const token = await getToken({ req, secret });
    if (!token) {
      throw {
        error: "Невалиден токен",
      };
    }
    const user = await User.findOne({ email: token.email });
    if (!user) {
      throw {
        error: "Невалиден акаунт",
      };
    }

    for (let [key, value] of Object.entries(formData)) {
      if (key != "comment") {
        if (value == "" || value.length === 0) {
          throw {
            error: "Пратени са невалидни данни",
          };
        }
      }
    }
    let price = totalPrice.totalPrice.join(".");

    await Delivery.create({
      cart: [...cart],
      ...formData,
      totalPrice: price,
      ownerId: user._id,
    });
    res.json({ message: "Успешно направена поръчка" });
  } catch (e) {
    console.log(e);
    res.status(400).json(e.error);
  }
}
