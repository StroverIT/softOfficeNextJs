import { Schema, model, models } from "mongoose";

const articlesScheme = new Schema({
  katNomer: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
  types: [{ type: String }],
  colors: [[{ type: String }]],
});

const productScheme = new Schema({
  section: {
    type: Schema.Types.ObjectId,
    imageUrl: String,
    articles: [articlesScheme],
  },
});

const Product = models.Product || model("Product", productScheme);

export default Product;
