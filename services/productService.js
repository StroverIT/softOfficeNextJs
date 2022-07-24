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

  let obj = await Product.findOne({ "articles.items._id": itemId });

  let formatedObj = {};

  formatedObj.sectionName = obj.sectionName;
  formatedObj.commonName = obj.commonName;
  let imageUrl = "";

  outer: for (let article of obj.articles) {
    formatedObj.description = article.description;
    formatedObj.articleName = article.articleName;
    for (let item of article.items) {
      if (item._id == itemId) {
        formatedObj.item = item;
        break outer;
      }
    }
  }
  return formatedObj;
};
