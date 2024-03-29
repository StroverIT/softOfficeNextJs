import Delivery from "../../../db/models/Delivery";
import User from "../../../db/models/User";
import Token from "../../../db/models/Token";

import { connectMongo } from "../../../db/connectDb";

import { ObjectId } from "mongodb";

import { getToken } from "next-auth/jwt";
import { DELIVERY, MAGAZINE } from "../../../components/cart/cartCostants";
import sendEmail from "../sendEmail";

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(req, res) {
  const { cart, inputs, deliveryInfo, typeOfPayment } = req.body;

  try {
    await connectMongo();

    //  User token
    const userToken = await getToken({ req, secret });

    if (!userToken) {
      throw {
        error: "Невалиден токен",
      };
    }
    // User
    const user = await User.findOne({ email: userToken.email });
    if (!user) {
      throw {
        error: "Невалиден акаунт",
      };
    }

    // Checkers if fields are empty
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
    // Only if is delivery and is not quarter
    if (inputs.typeOfDelivery == DELIVERY) {
      if (
        deliveryInfo.quarter.name === "Избери квартал" &&
        deliveryInfo.city.name == "София"
      ) {
        throw {
          error: "Моля изберете квартал",
        };
      }
    }
    if (
      inputs.typeOfDelivery != DELIVERY &&
      inputs.typeOfDelivery != MAGAZINE
    ) {
      throw {
        error: "Метода на доставка не е правилна!",
      };
    }
    // Check if is promotion

    let subTotal = parseFloat(
      cart
        .map((product) => {
          const item = product.item.item;
          let cena = item.cena;
          if (item.isOnPromotions) {
            cena = item.promotionalPrice;
          }

          return cena * product.qty;
        })
        .reduce((a, b) => a + b, 0)
        .toFixed(2)
    );
    // Check if user have promootion on section
    let dds = subTotal * 0.2;

    let dostavka = 0;

    if (inputs.typeOfDelivery != MAGAZINE) {
      dostavka = dds > 50 ? 0 : 10;
    }
    let totalPrice = subTotal + dds + dostavka;

    let data = {
      cart: [...cart],
      totalPrice,
      ownerId: user._id,
      typeOfDelivery: inputs.typeOfDelivery,
      comment: inputs.comment,
      typeOfPayment,
    };

    const address = inputs.address;
    data.deliveryPrice = dostavka;
    data.addressInfo = {
      name: address.fullName,
      telephone: address.phoneNumber,
    };
    if (inputs.typeOfDelivery == DELIVERY) {
      address.address = `${
        deliveryInfo.quarter.name == "Избери квартал"
          ? ""
          : deliveryInfo.quarter.name
      }`;
      address.city = deliveryInfo.city.name;
    }
    let message = `
    <h3>Вашата поръчка беше направена успешно! Благодарим Ви, че пазарувахте от SoftOffice !</h2>
    
    `;
    if (user.role == "worker") {
      data.isVerified = false;
      // Later add link to the admin panel <3

      message = `<h3>Имате нова поръчка, вижте в админ панела ви!</h3><br/><p>Чакаме вашето потвърждение</p>`;
      user.email = await user.populate("bossId");
    }
    sendEmail(
      process.env.EMAIL_SEND,
      user.email,
      "Поръчка в SoftOffice",
      message
    );
    if (user.role != "worker") {
      const adminMesage = `<h3>Имате нова поръчка в softOffice</h3>`;
      sendEmail(
        process.env.EMAIL_SEND,
        "office@softofficebg.com",
        "Поръчка в SoftOffice",
        adminMesage
      );
    }

    await Delivery.create(data);

    res.json({ message: "Поръчката беше направена успешно!" });
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
}
