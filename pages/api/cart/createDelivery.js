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
          return item.item.price * item.qty;
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
    if (inputs.typeOfDelivery == EKONT) {
      if (inputs.address?.office) {
        if (!inputs.address.office) throw { error: "Пратен е невалиден офис" };
        // Write needed data when is for office to EKONT
      }
      if (inputs.address?.address) {
        if (!inputs.address.address)
          throw { error: "Пратен е невалиден адрес" };

        // Write needed data when is for address to EKONT
      }
      // Send to ekont needed data
    }

    const verifyToken = await Token.create({
      userId: user._id,
      token: new ObjectId(),
    });
    const message = `
    <h3>За потвърждаване на поръчка в IvdaGeo.bg.
    </h2><a href="${process.env.HOST_URL}/account/verifyDelivery/${user._id}/${verifyToken.token}">Цъкнете тук</a>
    `;
    sendEmail(
      process.env.EMAIL_SEND,
      user.email,
      "Потвърждаване на поръчка IvdaGeo",
      message
    );
    await Delivery.create(data);

    res.json({ message: "Успешно направена поръчка" });
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
}
