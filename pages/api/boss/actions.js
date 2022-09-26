import { connectMongo } from "../../../db/connectDb";
import User from "../../../db/models/User";
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

    if (user.role != "admin") {
      throw {
        error: "Нямате такива права",
      };
    }
    const { action } = req.body;

    if (action == "remove") {
      const { bossId, workers } = req.body;

      await User.updateOne(
        { _id: bossId },
        { $set: { role: "user" }, $unset: { workers: 1 } }
      );
      await User.updateMany(
        { _id: { $in: workers } },
        { $set: { role: "user" }, $unset: { bossId: 1 } }
      );

      return res.json({ message: "Успешно премахнахте шефа!" });
    }
    if (action == "addWorkers") {
      const { bossId } = req.body;
      const workers = req.body.workers.map((worker) => {
        return worker.email;
      });
      const isFound = await User.find({
        email: { $in: workers },
      }).lean();

      if (isFound.length != workers.length) {
        throw {
          error: "Не същестува един от и-мейлите",
        };
      }
      const workersId = isFound.map((worker) => {
        return worker._id;
      });

      const isAlreadyWorker = await User.find({ workers: { $in: workersId } });

      if (isAlreadyWorker.length > 0)
        throw {
          error: "Един от работниците вече съществува",
        };

      await User.updateMany(
        { _id: { $in: workersId } },
        { $set: { role: "worker", bossId } }
      );
      await User.updateOne(
        { _id: bossId },
        { $push: { workers: { $each: workersId } } }
      );
      return res.json({ message: "Успешно добавихте нов/нови работници!" });
    }
    if (action == "removeWorkers") {
      const { bossId } = req.body;
      const workers = req.body.workers.map((worker) => {
        return worker.email;
      });
      const isFound = await User.find({
        email: { $in: workers },
      }).lean();

      if (isFound.length != workers.length) {
        throw {
          error: "Един от и-мейлите е невалиден!",
        };
      }
      const workersId = isFound.map((worker) => {
        return worker._id;
      });

      await User.updateMany(
        { _id: { $in: workersId } },
        { $set: { role: "user" }, $unset: { bossId: 1 } }
      );
      await User.updateOne(
        { _id: bossId },
        { $pull: { workers: { $in: workersId } } }
      );
      return res.json({ message: "Успешно премахнахте работниците!" });
    }
    if (action == "changeBoss") {
      const { newBossEmail, bossId } = req.body;

      const newBossData = await User.findOne({ email: newBossEmail });
      const bossData = await User.findOne({ _id: bossId });

      if (!newBossData) {
        throw {
          error: "Не същестува такъв и-мейл",
        };
      }

      await User.updateOne(
        { _id: bossId },
        { $set: { role: "user" }, $unset: { workers: 1 } }
      );

      await User.updateMany({ bossId }, { $set: { bossId: newBossData._id } });
      await User.updateOne(
        { _id: newBossData._id },
        {
          $set: { role: "boss", workers: bossData.workers },
          $unset: { bossId: 1 },
        }
      );

      return res.json({ message: "Успешно сменихте шефа!" });
    }
    // Must add personal promotions
  } catch (e) {
    console.log(e);
    res.json({ error: e?.error });
  }
}

export default handler;

// 6317295b84007f95f3397f9f
// 62cbd7b8e7e618342b2a28ab
