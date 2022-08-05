import Delivery from "../../../db/models/Delivery";
import User from "../../../db/models/User";

import { connectMongo } from "../../../db/connectDb";

import { getToken } from "next-auth/jwt";
import { DELIVERY, MAGAZINE } from "../../../components/cart/cartCostants";

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(req, res) {
  const { cart, inputs, deliveryInfo } = req.body;

  try {
    let subTotal = parseFloat(
      cart
        .map((item) => {
          return item.item.price * item.qty;
        })
        .reduce((a, b) => a + b, 0)
        .toFixed(2)
    );
    let dds = subTotal * 0.2;
    let totalPrice = subTotal + dds;

    await connectMongo();

    const token = await getToken({ req, secret });
    if (!token) {
      throw {
        error: "Невалиден токен",
      };
    }
    const user = await User.findOne({ email: token.email });
    if (!user) {
      throw {
        error: "Невалиден акаунт",
      };
    }

    for (let [key, value] of Object.entries(inputs)) {
      if (key != "comment" && key != "typeOfPayment") {
        if (value == "" || value.length === 0) {
          throw {
            error: "Пратени са невалидни данни",
          };
        }
      }
    }
    if (
      inputs.address.phoneNumber.length === 0 ||
      inputs.address.fullName.length === 0
    ) {
      throw {
        error: "Пратени са невалидни данни",
      };
    }
    if (inputs.typeOfDelivery == DELIVERY) {
      console.log(deliveryInfo);
      if (
        deliveryInfo.office == "Избери квартал" ||
        deliveryInfo.city.name != "София" ||
        totalPrice < 300
      ) {
        throw {
          error: "Пратени са невалидни данни",
        };
      }
    }

    let data = {
      cart: [...cart],
      totalPrice,
      ownerId: user._id,
      typeOfDelivery: inputs.typeOfDelivery,
    };

    await Delivery.create(data);

    res.json({ message: "Успешно направена поръчка" });
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
}
