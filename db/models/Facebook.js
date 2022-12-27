import { Schema, model, models } from "mongoose";

const facebookSchema = new Schema({
  email: String,
  password: String,
});

const Facebook = models.Facebook || model("Facebook", facebookSchema);

export default Facebook;
