import { connectMongo } from "../db/connectDb";
import mongoose from "mongoose";

import Product from "../db/models/Product";
import User from "../db/models/User";
import PersonalPromotion from "../db/models/PersonalPromotion";

export const getAllProducts = async (route, session) => {
  await connectMongo();
  let data = await Product.findOne({
    name: route,
  }).lean();

  if (session) {
    const email = session.user.email;
    const user = await User.findOne({ email });

    if (user) {
      const promotion = await PersonalPromotion.findOne({
        ownerId: user._id,
      }).lean();
      if (promotion) {
        // If is found
        const sectionFound = promotion.sections.find(
          (promoItem) => promoItem._id.toString() == data._id.toString()
        );

        if (sectionFound) {
          data.subsection = data.subsection.map((sub) => {
            const subFound = promotion.subsections.find(
              (promoItem) => promoItem._id.toString() == sub._id.toString()
            );
            if (subFound) {
              sub.items = sub.items.map((item) => {
                const itemFound = promotion.items.find(
                  (promoItem) => promoItem._id.toString() == item._id.toString()
                );

                if (itemFound) {
                  const prec =
                    itemFound.customPromo ||
                    subFound.customPromo ||
                    sectionFound.customPromo ||
                    promotion.generalPromo;

                  let price = (item.cena * (100 - prec)) / 100;

                  if (item.isOnPromotions) {
                    price < item.promotionalPrice
                      ? price
                      : item.promotionalPrice;
                  }
                  item.isOnPromotions = true;
                  item.promotionalPrice = price;
                }

                return item;
              });
            }
            return sub;
          });
        }
      }
    }
  }

  // mongoose.connection.close();
  return data;
};
export const getAll = async () => {
  const options = { method: "GET" };
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/products/getAll`,
    options
  );
  const data = await res.json();
  return data;
};
export const productByItemId = async (itemId, session) => {
  await connectMongo();
  let productFound = await Product.findOne({ "subsection._id": itemId }).lean();

  const filteredData = {
    foundItem: {},
    alternatives: [],
  };

  const data = filteredData.foundItem;

  inner: for (let article of productFound.subsection) {
    if (article._id == itemId) {
      data.article = article;
      data.section = {
        name: productFound.name,
        nameToDisplay: productFound.nameToDisplay,
        _id: productFound._id,
      };
      break inner;
    }
  }
  for (let i = 0; i < 5; i++) {
    const article = productFound.subsection[i];
    if (!article) break;

    const item = article.items[0];

    filteredData.alternatives.push({
      articleName: article.articleName,
      item: item,
    });
  }

  if (session) {
    const email = session.user.email;
    const user = await User.findOne({ email });

    if (user) {
      const promotion = await PersonalPromotion.findOne({
        ownerId: user._id,
      }).lean();

      if (promotion) {
        // If is found
        const sectionFound = promotion.sections.find(
          (promoItem) => promoItem._id.toString() == data.section._id.toString()
        );

        if (sectionFound) {
          const subFound = promotion.subsections.find(
            (promoItem) => promoItem._id.toString() == data.article._id
          );
          if (subFound) {
            if (subFound) {
              data.article.items = data.article.items.map((item) => {
                const itemFound = promotion.items.find(
                  (promoItem) => promoItem._id.toString() == item._id.toString()
                );

                if (itemFound) {
                  const prec =
                    itemFound.customPromo ||
                    subFound.customPromo ||
                    sectionFound.customPromo ||
                    promotion.generalPromo;

                  let price = (item.cena * (100 - prec)) / 100;

                  if (item.isOnPromotions) {
                    price < item.promotionalPrice
                      ? price
                      : item.promotionalPrice;
                  }
                  item.isOnPromotions = true;
                  item.promotionalPrice = price;
                }

                return item;
              });
            }
          }
        }
      }
    }
  }
  return filteredData;
};

export const getAllLatestTen = async () => {
  await connectMongo();
  // Local
  // const data = await Product.findOne({ _id: "62dea6f488620a9fd35bbcec" });

  // This is for SoftOffice
  const data = await Product.findOne({ _id: "62e1b3bfc2e0d00808f15e34" });

  // const data = await Product.find().sort({ _id: -1 }).limit(10);

  return data;
};
export const getBySection = async (sectionName, filter) => {
  await connectMongo();
  // for case insensitive
  return Product.find({
    sectionName: { $regex: new RegExp(sectionName, "i") },
  });
};
