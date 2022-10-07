import React from "react";

const sizing = {
  lg: " px-5 md:px-16 py-5 md:text-xl",
};
<<<<<<< HEAD
export default function BuyBtn({
  border,
  lg,
  onClick,
  text = "Купи",
  metaData,
}) {
=======
export default function BuyBtn({ border, lg, onClick }) {
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
  return (
    <div className={`${border ? "border-t border-gray" : ""}`}>
      <button
        type="button"
        className={`${
          lg ? sizing.lg : ""
<<<<<<< HEAD
        } w-full py-1  font-semibold text-white rounded-full bg-primary `}
        onClick={onClick}
        data={metaData}
      >
        {text}
=======
        } w-full py-1 my-10 font-semibold text-white rounded-full bg-primary lg:my-5`}
        onClick={onClick}
      >
        Купи
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
      </button>
    </div>
  );
}
