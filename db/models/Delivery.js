import { Schema, model, models } from "mongoose";

const deliveryScheme = new Schema({
  cart: [{ type: Object, required: true }],
  name: { type: String, required: true },
  telephone: { type: String, required: true },
  city: { type: String, required: true },
  zipCode: { type: String, required: true },
  address: { type: String, required: true },
  comment: String,
  totalPrice: { type: Number, required: true },
  ownerId: { type: Schema.Types.ObjectId, ref: "User" },
  status: { type: String, default: "progress" },
  createdAt: {
    type: String,
    default: () => {
      return new Date(Date.now()).toLocaleDateString();
    },
  },
});

const Delivery = models.Delivery || model("Delivery", deliveryScheme);

export default Delivery;
