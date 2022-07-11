import { Schema, model, models } from "mongoose";

const itemScheme = new Schema({
  katNomer: {
    type: String,
    required: true,
  },
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
  items: [{ itemScheme }],
});

const productScheme = new Schema({
  section: {
    type: String,
  },
  imageUrl: {
    type: String,
  },

  articles: [{ articlesScheme }],
});

const Product = models.Product || model("Product", productScheme);

export default Product;
