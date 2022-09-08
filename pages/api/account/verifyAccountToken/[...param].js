//Models
import User from "../../../../db/models/User";
import Token from "../../../../db/models/Token";

async function handler(req, res) {
  const { param } = req.query;
  const [userId, token] = param;

  const foundToken = await Token.findOne({ token: token }).populate("userId");

  if (!foundToken) {
    return res.status(404).json({ message: "Невалидна сесия!" });
  }
  if (foundToken.userId._id != userId)
    return res.status(406).json({ message: "Невалидна сесия!" });

  const user = await User.findById(foundToken.userId._id);
  user.isVerified = true;
  await user.save();
  await Token.deleteOne({ _id: foundToken._id });

  return res.status(201).json({ message: "Успешно потвърдихте акаунта си!" });
}

export default handler;
