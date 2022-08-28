//Models
import Delivery from "../../../../db/models/Delivery";
import Token from "../../../../db/models/Token";
import { connectMongo } from "../../../../db/connectDb";

async function handler(req, res) {
  const { param } = req.query;
  try {
    await connectMongo();

    const [userId, token] = param;

    const foundToken = await Token.findOne({ token: token }).populate("userId");

    if (!foundToken) {
      return res.status(404).json({ message: "Невалидна сесия!" });
    }
    if (foundToken.userId._id != userId)
      return res.status(406).json({ message: "Невалидна сесия!" });

    const delivery = await Delivery.findOne({ ownerId: foundToken.userId });
    delivery.isVerified = true;
    await delivery.save();
    await Token.deleteOne({ _id: foundToken._id });
    // Must send email to GERI email that is created a delivery
    return res
      .status(201)
      .json({ message: "Успешно потвърдихте поръчката си" });
  } catch (e) {
    console.log(e);
  }
}

export default handler;
