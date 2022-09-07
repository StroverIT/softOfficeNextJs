import { connectMongo } from "../../../../db/connectDb";
import User from "../../../../db/models/User";
import PersonalPromotion from "../../../../db/models/PersonalPromotion";

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
    const isAlreadyPromotion = await PersonalPromotion.findOne({
      ownerId: user._id,
    });
    if (isAlreadyPromotion) {
      throw {
        error: `${user.email} вече има промоции. Първо ги махнете!`,
      };
    }
    // End of checkers
    const data = {
      ...req.body,
      ownerId: user._id,
    };
    await PersonalPromotion.create(data);
    res.json({ message: "Заявката беше изпълнена успешно!" });
  } catch (e) {
    console.log(e);
    res.json({ error: e?.error });
  }
}

export default handler;
