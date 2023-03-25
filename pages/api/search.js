import { connectMongo } from "../../db/connectDb";
import mongoose from "mongoose";

import Product from "../../db/models/Product";

export default async function handler(req, res) {
  await connectMongo();

  try {
    const { input } = req.body;
    let options = {
      $regex: new RegExp(`^${input}.*`),
      $options: "i",
    };
    let search = {
      sections: [],
      subsections: [],
      katNomera: [],
    };
    let section = await Product.findOne({ nameToDisplay: options }).select(
      "nameToDisplay name"
    );
    let subsections = await Product.findOne({
      "subsection.nameToDisplay": options,
    });

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
      for (let subsection of subsections.subsection) {
        if (
          subsection.nameToDisplay.toLowerCase().includes(input.toLowerCase())
        ) {
          search.subsections.push({
            name: subsection.nameToDisplay,
            route: `${subsections.name}/${subsection._id}`,
            _id: subsection._id,
          });
        }
      }
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
          }
        }
      }
    }
    // search.sections = search.sections.slice(0, 10);
    // search.subsections = search.sections.slice(0, 10);
    search.katNomera = search.katNomera.slice(0, 10);
    search.sections = search.sections.slice(0, 10);
    search.subsections = search.subsections.slice(0, 10);

    mongoose.connection.close();

    res.json(search);
  } catch (e) {
    console.log(e);
    res.json({ error: e });
  }
}
