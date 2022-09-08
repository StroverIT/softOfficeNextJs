import { MongoClient, ObjectId } from "mongodb";
import { compare, hash } from "bcryptjs";

import { getToken } from "next-auth/jwt";
const secret = process.env.NEXTAUTH_SECRET;

async function handler(req, res) {
  const token = await getToken({ req, secret });

  const currPass = req.body.currentPassword;
  const newPass = req.body.newPassword;
  const newPassConf = req.body.newPasswordConf;

  if (req.method == "POST") {
    const client = await MongoClient.connect(process.env.DB_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db();
    const collection = db.collection("users");
    const user = await collection.findOne({
      email: token.email,
    });
    if (!user) {
      return res.status(404).json({ message: "Невалидни данни", isErr: true });
    }
    const checkPassword = await compare(currPass, user.password);

    if (!checkPassword) {
      return res.status(406).json({ message: "Грешна парола", isErr: true });
    }
    if (newPass != newPassConf) {
      return res
        .status(406)
        .json({ message: "Паролите трябва да съвпадата", isErr: true });
    }
    collection.updateOne(
      { email: token.email },
      { $set: { password: await hash(newPassConf, 12) } }
    );
    res.status(201).json({ message: "Паролата ви беше сменена успешно!" });
  }
}
export default handler;
