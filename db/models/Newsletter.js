import { Schema, model, models } from "mongoose";

const newsletterSchema = new Schema({
  email: { type: String, required: true },
  createdAt: {
    type: String,
    default: () => {
      return new Date(Date.now()).toLocaleDateString();
    },
  },
});

const Newsletter = models.Newsletter || model("Newsletter", newsletterSchema);

export default Newsletter;
