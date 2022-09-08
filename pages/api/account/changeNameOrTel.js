import { MongoClient } from "mongodb";

import { getToken } from "next-auth/jwt";
const secret = process.env.NEXTAUTH_SECRET;

async function handler(req, res) {
  const token = await getToken({ req, secret });

  const phoneNumber = parseInt(req.body.phoneNumber);

  //Connect with database
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

    // No user found
    if (!user) {
      client.close();

      return res
        .status(404)
        .json({ message: "Грешно пратени данни", isErr: true });
    }
    // SAME PHONE AS ANOTHER USER
    const isSamePhone = await collection.findOne({
      phoneNumber,
    });

    if (isSamePhone) {
      client.close();
      return res
        .status(404)
        .json({ message: "Такъв номер вече съществува", isErr: true });
    }

    // User phone is passing

    await collection.updateOne(
      { email: token.email },
      { $set: { phoneNumber } }
    );
    client.close();

    return res.status(201).json({
      message: "Успешно си сменихте телефона",
      isErr: false,
    });
  }
}
export default handler;
