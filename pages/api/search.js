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
      items: [],
      articleNames: [],
      sections: [],
    };

    let articleName = await Product.find({
      "articles.articleName": options,
    }).exec();
    let section = await Product.find({ sectionName: options }).select(
      "sectionName imageUrl"
    );
    mongoose.connection.close();

    search.sections = section.map((section) => {
      return {
        sectionName: section.sectionName,
        imageUrl: section.imageUrl,
        route: translationToRoute(section.sectionName),
      };
    });
    // for (let section of items) {
    //   for (let articles of section?.articles) {
    //     if (articles.articleName.toLowerCase().includes(input.toLowerCase())) {
    //       for (let item of articles?.items) {
    //         search.items.push({
    //           section: section.sectionName,
    //           articleName: articles.articleName,
    //           weight: item.weight,
    //           _id: item._id,
    //           route: `${translationToRoute(section.sectionName)}/${item._id}`,
    //         });
    //       }
    //     }
    //   }
    // }
    for (let section of articleName) {
      for (let articles of section?.articles) {
        if (articles.articleName.toLowerCase().includes(input.toLowerCase())) {
          search.articleNames.push({
            section: section.sectionName,
            articleName: articles.articleName,
            imageUrl: section.imageUrl,
            route: `${translationToRoute(section.sectionName)}`,
          });
        }
      }
    }

    // search.items = search.items.slice(0, 10);
    search.articleNames = search.articleNames.slice(0, 10);
    search.sections = search.sections.slice(0, 10);

    res.json(search);
  } catch (e) {
    console.log(e);
  }
}
