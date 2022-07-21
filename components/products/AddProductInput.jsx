import React, { useState, useEffect } from "react";
// Icons
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

export default function AddProductInput({
  contClass,
  inputClass,
  currQty,
  setQty,
}) {
  const changeHandler = (e) => {
    if (e.target.value < 1) e.target.value = 1;
    setQty(e.target.value);
  };

  return (
    <div className={`relative ${contClass ? contClass : ""}`}>
      <input
        type="number"
        className={`w-full border border-l pl-4  border-primary py-[0.3rem] placeholder:text-sm placeholder:font-default placeholder:text-[#808080] placeholder:absolute placeholder:left-2 placeholder:top-1/2 placeholder:-translate-y-1/2 ${
          inputClass ? inputClass : ""
        }`}
        value={currQty}
        id="qty"
        onChange={changeHandler}
      />
      <div className="absolute -translate-y-1/2 select-none top-1/2 right-2">
        <div className="cursor-pointer" onClick={() => setQty((c) => c + 1)}>
          <IoIosArrowUp />
        </div>
        <div
          className="cursor-pointer"
          // onClick={() => changeQty(currQty < 2 ? 1 : parseInt(currQty) - 1)}
          onClick={() => setQty((c) => (c < 2 ? 1 : c - 1))}
        >
          <IoIosArrowDown />
        </div>
      </div>
    </div>
  );
}
