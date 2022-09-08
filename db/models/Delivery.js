import { Schema, model, models } from "mongoose";

const addressSchema = new Schema({
  name: { type: String },
  telephone: { type: String },
  city: { type: String },
  zipCode: { type: String },
  address: { type: String },
});
const deliveryScheme = new Schema({
  cart: [{ type: Object, required: true }],
  isVerified: { type: Boolean, default: true },
  addressInfo: addressSchema,
  comment: String,
  totalPrice: { type: Number, required: true },
  ownerId: { type: Schema.Types.ObjectId, ref: "User" },
  status: {
    type: String,
    default: "progress",
    enum: ["progress", "sent", "returned", "finished"],
  },
  createdAt: {
    type: String,
    default: () => {
      return new Date(Date.now()).toLocaleDateString();
    },
  },
  invoice: { type: Object },
  typeOfDelivery: { type: String, required: true },
});

const Delivery = models.Delivery || model("Delivery", deliveryScheme);

export default Delivery;
