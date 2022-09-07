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
    let { workers, bossId } = req.body;

    const toArray = workers.map((worker) => worker.email);

    const isFound = await User.find({
      email: { $in: toArray },
    }).lean();

    if (toArray.length != isFound.length) {
      throw {
        error: "Един от и-мейлите е написан неправилно или не съществува",
      };
    }

    const getAllId = isFound.map((user) => {
      return user._id;
    });

    const updatedRolesWorkers = await User.updateMany(
      { _id: { $in: getAllId } },
      { $set: { role: "worker", bossId: ObjectId(bossId) } }
    );
    const bossUpdate = await User.updateOne(
      { _id: ObjectId(bossId) },
      { $set: { workers: getAllId, role: "boss" } }
    );

    res.json({ message: "Заявката беше изпълнена успешно!" });
  } catch (e) {
    console.log(e);
    res.json({ error: e?.error });
  }
}

export default handler;
