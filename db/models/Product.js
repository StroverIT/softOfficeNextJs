import { Schema, model, models } from "mongoose";

const itemScheme = new Schema({
  weight: String,
  price: Number,
});
const articlesScheme = new Schema({
  articleName: {
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
  description: {
    type: [{ type: String }],
  },
  articles: [articlesScheme],
});

const Product = models.Product || model("Product", productScheme);

export default Product;
