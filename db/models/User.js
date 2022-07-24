import { Schema, model, models } from "mongoose";

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
  isVerified: {
    type: Boolean,
    default: false,
  },
});

const User = models.User || model("User", userScheme);

export default User;
