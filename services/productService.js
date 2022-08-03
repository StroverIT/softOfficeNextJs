import { connectMongo } from "../db/connectDb";
import mongoose from "mongoose";

import Product from "../db/models/Product";

export const getAllProducts = async (sectionName, filter) => {
  await connectMongo();
  // for case insensitive

  return Product.findOne({
    sectionName: {
      $regex: new RegExp(sectionName, "i"),
    },
  });
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
export const productByItemId = async (itemId) => {
  await connectMongo();

  let data = await Product.findOne({ "articles.items._id": itemId }).lean();

  const filteredData = {
    foundItem: {},
    alternatives: [],
  };

  const foundItem = filteredData.foundItem;

  inner: for (let article of data.articles) {
    for (let item of article.items) {
      if (item._id == itemId) {
        foundItem.item = item;
        foundItem.articleName = article.articleName;
        foundItem.sectionName = data.sectionName;
        foundItem.imageUrl = data.imageUrl;
        foundItem.description = data.description;
        break inner;
      }
    }
  }
  for (let i = 0; i < 5; i++) {
    const article = data.articles[i];
    if (!article) break;

    const item = article.items[0];

    filteredData.alternatives.push({
      articleName: article.articleName,
      item: item,
    });
  }
  return filteredData;
};

export const getAllLatestTen = async () => {
  await connectMongo();
  // Local
  // const data = await Product.findOne({ _id: "62dea6f488620a9fd35bbcec" });

  // This is for ivdaGeo
  const data = await Product.findOne({ _id: "62e1b3bfc2e0d00808f15e34" });

  // const data = await Product.find().sort({ _id: -1 }).limit(10);

  return data;
};
