import { Schema, model, models } from "mongoose";

const personalPromotion = new Schema({
  sections: [
    {
      _id: { type: Schema.Types.ObjectId },
      isWhole: Boolean,
      customPromo: Number,
    },
  ],
  subsections: [
    {
      _id: { type: Schema.Types.ObjectId },
      isWhole: Boolean,
      customPromo: Number,
    },
  ],

  items: [{ itemId: { type: Schema.Types.ObjectId }, customPromo: Number }],

  generalPromotion: Number,

  ownerId: { type: Schema.Types.ObjectId, ref: "user" },
});

const PersonalPromotion =
  models.PersonalPromotion || model("PersonalPromotion", personalPromotion);

export default PersonalPromotion;
