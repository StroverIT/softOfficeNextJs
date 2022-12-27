import { Schema, model, models } from "mongoose";

const reviewSchema = new Schema({
  stars: Number,
  name: String,
  email: String,
  image: String,
});

const Review = models.Review || model("Review", reviewSchema);

export default Review;
