import { connectMongo } from "../../../../db/connectDb";
import Delivery from "../../../../db/models/Delivery";
import User from "../../../../db/models/User";

import { getToken } from "next-auth/jwt";
const secret = process.env.NEXTAUTH_SECRET;

async function handler(req, res) {
  await connectMongo();

  const { status, deliveryId } = req.body;
  try {
    const token = await getToken({ req, secret });
    if (!token) {
      throw {
        error: "Невалиден токън",
      };
    }
<<<<<<< HEAD

=======
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
    const user = await User.findOne({ email: token.email });
    if (!user) {
      throw {
        error: "Няма такъв акаунт",
      };
    }
    if (user.role != "admin") {
      throw {
        error: "Нямате такива права",
      };
    }

    await Delivery.updateOne({ _id: deliveryId }, { $set: { status } });
    res.json({
      message: `Успешно сменен статус на ${status}`,
      newStatus: status,
    });
  } catch (e) {
    console.log(e);
    res.json(e.error);
  }
}
export default handler;
