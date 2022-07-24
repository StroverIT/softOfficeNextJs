import { MongoClient, ObjectId } from "mongodb";
import { compare } from "bcryptjs";

import { getToken } from "next-auth/jwt";
const secret = process.env.NEXTAUTH_SECRET;

async function handler(req, res) {
  const token = await getToken({ req, secret });
  const email = req.body.email;
  const pass = req.body.password;

  // Connect with database
  if (req.method == "POST") {
    const client = await MongoClient.connect(process.env.DB_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db();
    const collection = db.collection("users");

    const user = await collection.findOne({ email: token.email });
    const isFoundEmail = await collection.findOne({
      email,
    });
    if (isFoundEmail) {
      return res
        .status(409)
        .json({ message: "Вече съществува такъв и-мейл", isErr: true });
    }
    // No user found

    const checkPassword = await compare(pass, user.password);

    if (!checkPassword) {
      client.close();

      return res.status(401).json({ message: "Грешна парола", isErr: true });
    }

    collection.updateOne({ email: token.email }, { $set: { email } });
    return res.json({ message: "И-мейла ви беше сменен успешно" });
  }
}
export default handler;
