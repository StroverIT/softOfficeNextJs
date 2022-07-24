import { connectMongo } from "../../db/connectDb";
import mongoose from "mongoose";

import Product from "../../db/models/Product";
import { translationToRoute } from "../../utils/translationToRoute";

export default async function handler(req, res) {
  await connectMongo();

  try {
    const { input } = req.body;
    let options = {
      $regex: new RegExp(`^${input}.*`),
      $options: "i",
    };
    let search = {
      katNomera: [],
      articleNames: [],
      sections: [],
    };

    let katNomer = await Product.find({
      "articles.items.katNomer": options,
    }).exec();
    let articleName = await Product.find({
      "articles.articleName": options,
    }).exec();
    let section = await Product.find({ sectionName: options }).select(
      "sectionName"
    );
    mongoose.connection.close();

    search.sections = section.map((section) => {
      return {
        sectionName: section.sectionName,
        route: translationToRoute(section.sectionName),
      };
    });
    for (let section of katNomer) {
      for (let articles of section?.articles) {
        for (let item of articles?.items) {
          if (item.katNomer.toLowerCase().includes(input.toLowerCase())) {
            search.katNomera.push({
              commonName: section.commonName,
              section: section.sectionName,
              articleName: articles.articleName,
              types: item.types,
              _id: item._id,
              katNomer: item.katNomer,
              route: `${translationToRoute(section.sectionName)}/${item._id}`,
            });
          }
        }
      }
    }
    for (let section of articleName) {
      for (let articles of section?.articles) {
        if (articles.articleName.toLowerCase().includes(input.toLowerCase())) {
          for (let item of articles?.items) {
            search.articleNames.push({
              section: section.sectionName,
              articleName: articles.articleName,
              types: item.types,
              _id: item._id,
              katNomer: item.katNomer,
              route: `${translationToRoute(section.sectionName)}/${item._id}`,
            });
          }
        }
      }
    }

    search.katNomera = search.katNomera.slice(0, 10);
    search.articleNames = search.articleNames.slice(0, 10);
    search.sections = search.sections.slice(0, 10);

    res.json(search);
  } catch (e) {
    console.log(e);
  }
}
