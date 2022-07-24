import { Schema, model, models } from "mongoose";

const favouriteSchema = new Schema({
  product: { type: Object },
  ownerId: { type: Schema.Types.ObjectId, ref: "user" },
});

const Favourite = models.Favourite || model("Favourite", favouriteSchema);

export default Favourite;
