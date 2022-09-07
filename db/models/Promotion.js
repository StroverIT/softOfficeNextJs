import { Schema, model, models } from "mongoose";

const productSchema = new Schema({
  product: { type: Object },
});

const Promotion = models.Promotion || model("Promotion", productSchema);

export default Promotion;
