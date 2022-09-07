import Delivery from "../../../db/models/Delivery";
import User from "../../../db/models/User";
import Token from "../../../db/models/Token";
import PersonalPromotions from "../../../db/models/PersonalPromotion";

import { connectMongo } from "../../../db/connectDb";

import { ObjectId } from "mongodb";

import { getToken } from "next-auth/jwt";
import { DELIVERY } from "../../../components/cart/cartCostants";
import sendEmail from "../sendEmail";

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(req, res) {
  const { cart, inputs, deliveryInfo } = req.body;

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
    // Check if is promotion
    const personalPromotions = await PersonalPromotions.findOne({
      ownerId: user._id,
    });
    let subTotal = parseFloat(
      cart
        .map((product) => {
          const item = product.item.item;
          let cena = item.cena;
          if (item.isOnPromotions) {
            cena = item.promotionalPrice;
          }
          if (personalPromotions) {
            const find = personalPromotions.sectionPromo.find(
              (item) => item.name == product.item.section.route
            );
            if (find) {
              let promoPerc =
                find.customPromo || personalPromotions.generalPromo;
              const promoPrice = (item.cena * (100 - promoPerc)) / 100;

              if (item.isOnPromotions) {
                let whichIsBetter =
                  promoPrice < item.promotionalPrice
                    ? promoPrice
                    : item.promotionalPrice;
                cena = whichIsBetter;
              } else {
                cena = promoPrice;
              }
            }
          }
          return cena * product.qty;
        })
        .reduce((a, b) => a + b, 0)
        .toFixed(2)
    );
    // Check if user have promootion on section
    let dds = subTotal * 0.2;
    let dostavka = dds > 50 ? 0 : 10;

    let totalPrice = subTotal + dds + dostavka;

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

    let message = `
    <h3>Вашата поръчка беше направена успешно, благодарим ви че пазарувахте от SoftOffice !</h2>
    
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
    await Delivery.create(data);

    res.json({ message: "Поръчката беше направена успешно!" });
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
}
