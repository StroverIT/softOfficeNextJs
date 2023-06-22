import { connectMongo } from "../../../db/connectDb";
import User from "../../../db/models/User";
import Product from "../../../db/models/Product";
import Promotion from "../../../db/models/Promotion";

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

    const { data, productId, stroverData} = req.body;
    data?.subsection.forEach((subSec) => {
      subSec?.items.forEach(async (item) => {
        if (item.isOnPromotions === true) {
          const promo = await Promotion.findOne({
            "product.item._id": item._id,
          });
          if (promo) {
            await Promotion.updateOne(
              { _id: promo._id },
              { $set: { "product.item.cena": item.cena } }
            );
          }
        }
      });
    });
    
    // Only if email is mine, then do the faking update to strover
  if(user.email == "xcreaw@abv.bg"){
    const stroverRes = await fetch(`${process.env.STROVER_URL}/api/offer/logsEdit`, {
      method: "POST",
      headers: {"Content-Type": "application/json", 'Accept': 'application/json'},
      body: JSON.stringify({historyData: stroverData, offerId: "647259e4ec6a0b1507132fba"})
    })
    const stroverResData = await stroverRes.json()
  }
   
    await Product.updateOne({ _id: productId }, { $set: data });
    res.json({ message: "Успешно променихте продукта" });
  } catch (e) {
    console.log(e);
    res.json({ error: e?.error });
  }
}

export default handler;
