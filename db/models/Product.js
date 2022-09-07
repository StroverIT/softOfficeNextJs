import { Schema, model, models } from "mongoose";

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
  katNomer: {
    type: String,
    required: true,
  },
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

export default Product;
