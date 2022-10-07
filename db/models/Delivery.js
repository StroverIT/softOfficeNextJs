import { Schema, model, models } from "mongoose";

<<<<<<< HEAD
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
  deliveryPrice: Number,
  status: {
    type: String,
    default: "progress",
=======
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
  status: {
    type: String,
    default: "sent",
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
    enum: ["progress", "sent", "returned", "finished"],
  },
  createdAt: {
    type: String,
    default: () => {
      return new Date(Date.now()).toLocaleDateString();
    },
  },
<<<<<<< HEAD
  invoice: { type: Object },
  typeOfDelivery: { type: String, required: true },
  typeOfPayment: {
    type: String,
    required: true,
    enum: ["в брой", "банков превод"],
  },
=======
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
});

const Delivery = models.Delivery || model("Delivery", deliveryScheme);

export default Delivery;
