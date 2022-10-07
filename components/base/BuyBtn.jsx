import React from "react";

const sizing = {
  lg: " px-5 md:px-16 py-5 md:text-xl",
};
export default function BuyBtn({
  border,
  lg,
  onClick,
  text = "Купи",
  metaData,
}) {
  return (
    <div className={`${border ? "border-t border-gray" : ""}`}>
      <button
        type="button"
        className={`${
          lg ? sizing.lg : ""
        } w-full py-1  font-semibold text-white rounded-full bg-primary `}
        onClick={onClick}
        data={metaData}
      >
        {text}
      </button>
    </div>
  );
}
