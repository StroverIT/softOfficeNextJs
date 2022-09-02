import { connectMongo } from "../db/connectDb";
import mongoose from "mongoose";

import Product from "../db/models/Product";

export const getAllProducts = async (route, filter) => {
  await connectMongo();
  // for case insensitive

  const data = await Product.findOne({
    name: route,
  });

  mongoose.connection.close();
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
export const productByItemId = async (itemId) => {
  await connectMongo();
  let data = await Product.findOne({ "subsection._id": itemId }).lean();

  const filteredData = {
    foundItem: {},
    alternatives: [],
  };

  const foundItem = filteredData.foundItem;

  inner: for (let article of data.subsection) {
    if (article._id == itemId) {
      foundItem.article = article;
      foundItem.section = {
        name: data.name,
        nameToDisplay: data.nameToDisplay,
        _id: data._id,
      };
      break inner;
    }
  }
  console.log(filteredData.foundItem);
  for (let i = 0; i < 5; i++) {
    const article = data.subsection[i];
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
