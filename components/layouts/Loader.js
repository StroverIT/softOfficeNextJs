import React from "react";

const Loader = ({ w = "w-6", h = "h-6" }) => {
  return (
    <div className="flex items-center justify-center">
      <div className={`loader ${w} ${h} `}></div>
    </div>
  );
};

export default Loader;
