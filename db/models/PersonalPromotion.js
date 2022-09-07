import { Schema, model, models } from "mongoose";

const personalPromotion = new Schema({
  sectionPromo: [
    {
      sectionId: { type: Schema.Types.ObjectId, ref: "product" },

      customPromo: Number,
      name: String,
      nameToDisplay: String,
    },
  ],
  generalPromo: Number,
  ownerId: { type: Schema.Types.ObjectId, ref: "user" },
});

const PersonalPromotion =
  models.PersonalPromotion || model("PersonalPromotion", personalPromotion);

export default PersonalPromotion;
