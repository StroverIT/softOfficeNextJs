import { connectMongo } from "../../../db/connectDb";
import User from "../../../db/models/User";
import Delivery from "../../../db/models/Delivery";

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
    const { deliveryId } = req.body;
    await Delivery.deleteOne({ _id: deliveryId });
    res.json({ message: "Успешно премахнахнте поръчката!" });
  } catch (e) {
    console.log(e);
    res.json({ error: e?.error });
  }
}

export default handler;
