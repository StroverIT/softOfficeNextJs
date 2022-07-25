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

  inner: for (let article of data.articles) {
    for (let item of article.items) {
      if (item._id == itemId) {
        article.item = item;
        data.article = article;
        delete data.articles;
        delete article.items;
        break inner;
      }
    }
  }
  console.log(data);
  return data;
};
