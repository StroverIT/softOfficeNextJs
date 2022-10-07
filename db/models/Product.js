import { Schema, model, models } from "mongoose";

<<<<<<< HEAD
// Item
const imageSchema = new Schema({
  fieldname: String,
  originalname: String,
  encoding: String,
  mimetype: String,
  destination: String,
  filename: String,
  path: String,
  size: Number,
});
const itemsSchema = new Schema({
  cvetove: {
    type: Boolean,
  },
  cena: {
    type: Number,
    required: true,
  },
=======
const itemScheme = new Schema({
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
  katNomer: {
    type: String,
    required: true,
  },
<<<<<<< HEAD
  tipove: {
    type: String,
    required: true,
  },
  isOnPromotions: {
    type: Boolean,
    default: false,
  },
  promotionalPrice: {
    type: Number,
  },
  imageUrl: String,
  isOnlyNumb: {
    type: Boolean,
    default: false,
  },
  isInStock: {
    type: Boolean,
    default: true,
  },
});

const subsectionSchema = new Schema({
  opisanie: {
    type: String,
  },
  tiput: {
    type: String,
  },

  nameToDisplay: {
    type: String,
  },
  img: [imageSchema],
  items: [itemsSchema],
});
const ProductsSchema = new Schema({
  name: { type: String, required: true },
  nameToDisplay: { type: String, unique: false, required: false },
  subsection: [subsectionSchema],
});
const Product = models.Product || model("Product", ProductsSchema);
=======
  price: {
    type: Number,
  },
  types: [{ type: String }],
  colors: [[{ type: String }]],
  imageUrl: {
    type: String,
  },
});
const articlesScheme = new Schema({
  articleName: {
    type: String,
  },
  description: {
    type: [{ type: String }],
  },
  imageUrl: {
    type: String,
  },
  items: [itemScheme],
});

const productScheme = new Schema({
  sectionName: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  commonName: {
    type: String,
  },
  articles: [articlesScheme],
});

const Product = models.Product || model("Product", productScheme);
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e

export default Product;
