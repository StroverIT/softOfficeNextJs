import { Schema, model, models, Model } from "mongoose";

interface IImage {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}
interface IItems {
  cvetove: Boolean;
  cena: Number;
  katNomer: String;
  tipove: String;
  isOnPromotions: Boolean;
  promotionalPrice: Number;
  imageUrl: String;
  isOnlyNumb: Boolean;
  isInStock: Boolean;
}
interface ISubsection {
  opisanie: String;
  tiput: String;
  nameToDisplay: String;
  img: [IImage];
  items: [IItems];
}
interface IProducts {
  name: String;
  nameToDisplay: String;
  subsection: [ISubsection];
}
// Item
const imageSchema = new Schema<IImage>({
  fieldname: String,
  originalname: String,
  encoding: String,
  mimetype: String,
  destination: String,
  filename: String,
  path: String,
  size: Number,
});
const itemsSchema = new Schema<IItems>({
  cvetove: {
    type: Boolean,
  },
  cena: {
    type: Number,
    required: true,
  },
  katNomer: {
    type: String,
    required: true,
  },
  tipove: {
    type: String,
    required: true,
  },
  isOnPromotions: {
    type: Boolean,
    default: false,
  },
  promotionalPrice: {
    type: Number,
  },
  imageUrl: String,
  isOnlyNumb: {
    type: Boolean,
    default: false,
  },
  isInStock: {
    type: Boolean,
    default: true,
  },
});

const subsectionSchema = new Schema<ISubsection>({
  opisanie: {
    type: String,
  },
  tiput: {
    type: String,
  },

  nameToDisplay: {
    type: String,
  },
  img: [imageSchema],
  items: [itemsSchema],
});
const ProductsSchema = new Schema<IProducts>({
  name: { type: String, required: true },
  nameToDisplay: { type: String, unique: false, required: false },
  subsection: [subsectionSchema],
});
const Product =
  (models.Product as Model<IProducts>) ||
  model<IProducts>("Product", ProductsSchema);

export default Product;
