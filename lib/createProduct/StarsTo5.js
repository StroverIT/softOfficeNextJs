import React from "react";
import ReactStars from "react-rating-stars-component";

const StarsTo5 = ({ stars }) => {
  return (
    <ReactStars value={stars} size={40} activeColor="#ffd700" edit={false} />
  );
};

export default StarsTo5;
