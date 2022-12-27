import React from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import ReactStars from "react-rating-stars-component";

const data = {
  size: 50,
  count: 5,
  color: "black",
  activeColor: "blue",
  value: 5,
  a11y: true,
  isHalf: true,
  emptyIcon: <BsStar />,
  halfIcon: <BsStarHalf />,
  filledIcon: <BsStarFill />,
  onChange: (newValue) => {
    console.log(`Example 2: new value is ${newValue}`);
  },
};
const CreateStar = ({ onChange }) => {
  return <ReactStars {...data} onChange={onChange} />;
};

export default CreateStar;
