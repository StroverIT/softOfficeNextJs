import { Schema, model, models } from "mongoose";

<<<<<<< HEAD
const addressSchema = new Schema({
  name: { type: String },
  telephone: { type: String },
  city: { type: String },
  zipCode: { type: String },
  address: { type: String },
});

=======
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
const userScheme = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: function () {
      return Date.now();
    },
  },
<<<<<<< HEAD
  addresses: [addressSchema],
  role: {
    type: String,
    enum: ["user", "admin", "worker", "boss"],
    default: "user",
  },
  bossId: { type: Schema.Types.ObjectId, ref: "User" },
  workers: [{ type: Schema.Types.ObjectId, ref: "User" }],
=======
  addresses: [
    {
      type: String,
    },
  ],
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
  isVerified: {
    type: Boolean,
    default: false,
  },
});

const User = models.User || model("User", userScheme);

export default User;
