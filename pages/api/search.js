import { connectMongo } from "../../db/connectDb";
import mongoose from "mongoose";

import Product from "../../db/models/Product";
<<<<<<< HEAD
=======
import { translationToRoute } from "../../utils/translationToRoute";
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e

export default async function handler(req, res) {
  await connectMongo();

  try {
    const { input } = req.body;
    let options = {
      $regex: new RegExp(`^${input}.*`),
      $options: "i",
    };
    let search = {
<<<<<<< HEAD
      sections: [],
      subsections: [],
      katNomera: [],
    };
    let section = await Product.findOne({ nameToDisplay: options }).select(
      "nameToDisplay name"
    );
    let subsections = await Product.findOne({
      "subsection.$": { $match: options },
    });
    console.log(subsections);

    let katNomera = await Product.findOne({
      "subsection.items.katNomer": options,
    });

    // route
    // name for displaying i
    // Katnomer
    // types
    if (section) {
      search.sections.push(section);
    }
    if (subsections) {
    }
    if (katNomera) {
      katNomeraLoop: for (let subSection of katNomera?.subsection) {
        for (let items of subSection.items) {
          if (items.katNomer.includes(input)) {
            const object = {
              katNomer: items.katNomer,
              types: items.tipove,
              name: `${katNomera.nameToDisplay} ${subSection.nameToDisplay}`,
              route: `${katNomera.name}/${subSection._id}`,
            };
            search.katNomera.push(object);
=======
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
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
          }
        }
      }
    }
<<<<<<< HEAD
    // search.sections = search.sections.slice(0, 10);
    // search.subsections = search.sections.slice(0, 10);
    search.katNomera = search.katNomera.slice(0, 10);
    mongoose.connection.close();
=======
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
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e

    res.json(search);
  } catch (e) {
    console.log(e);
<<<<<<< HEAD
    res.json({ error: e });
=======
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
  }
}
