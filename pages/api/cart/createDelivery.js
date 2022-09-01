import Delivery from "../../../db/models/Delivery";
import User from "../../../db/models/User";
import Token from "../../../db/models/Token";

import { connectMongo } from "../../../db/connectDb";

import { ObjectId } from "mongodb";

import { getToken } from "next-auth/jwt";
import { DELIVERY, EKONT } from "../../../components/cart/cartCostants";
import sendEmail from "../sendEmail";

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(req, res) {
  const { cart, inputs, deliveryInfo } = req.body;

  try {
    let subTotal = parseFloat(
      cart
        .map((item) => {
          return item.item.item.cena * item.qty;
        })
        .reduce((a, b) => a + b, 0)
        .toFixed(2)
    );
    let dds = subTotal * 0.2;
    let totalPrice = subTotal + dds;

    await connectMongo();

    const userToken = await getToken({ req, secret });
    if (!userToken) {
      throw {
        error: "Невалиден токен",
      };
    }
    const user = await User.findOne({ email: userToken.email });
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
      inputs.address.phoneNumber?.length === 0 ||
      inputs.address.phoneNumber == null ||
      inputs.address.fullName.length === 0
    ) {
      throw {
        error: "Пратени са невалидни данни",
      };
    }
    if (inputs.typeOfDelivery == DELIVERY) {
      if (deliveryInfo.quarter.name === "Избери квартал") {
        throw {
          error: "Моля изберете квартал",
        };
      }
    } else {
      throw {
        error: "Метода на доставка не е правилна!",
      };
    }

    let data = {
      cart: [...cart],
      totalPrice,
      ownerId: user._id,
      typeOfDelivery: inputs.typeOfDelivery,
      comment: inputs.comment,
    };
    if (inputs.typeOfDelivery == DELIVERY) {
      const address = inputs.address;
      data.addressInfo = {
        name: address.fullName,
        telephone: address.phoneNumber,
        address: `${deliveryInfo.quarter.name} ${address.address}`,
        city: deliveryInfo.city.name,
      };
    }

    const verifyToken = await Token.create({
      userId: user._id,
      token: new ObjectId(),
    });
    const message = `
    <h3>За потвърждаване на поръчка в SoftOffice.bg.</h2>
    <a href="${process.env.HOST_URL}/account/verifyDelivery/${user._id}/${verifyToken.token}">Цъкнете тук</a>
    `;
    sendEmail(
      process.env.EMAIL_SEND,
      user.email,
      "Потвърждаване на поръчка SoftOffice",
      message
    );
    console.log(data);
    await Delivery.create(data);

    res.json({ message: "Поръчката беше направена, вижте си и-мейла!" });
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
}
