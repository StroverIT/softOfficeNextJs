import React, { useState, useEffect } from "react";
// Icons
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const iconClass =
  "cursor-pointer h-full border-gray-400 border py-3 px-4 text-lg font-bold select-none";

export default function AddProductInput({
  contClass,
  inputClass,
  currQty,
  setQty,
}) {
  const changeHandler = (e) => {
    if (e.target.value < 1) e.target.value = 1;
    setQty(parseFloat(e.target.value));
  };
  return (
    <div
      className={` ${
        contClass ? contClass : ""
      } flex items-center justify-center `}
    >
      <div className={iconClass} onClick={() => setQty((c) => c + 1)}>
        <AiOutlinePlus />
      </div>
      <input
        type="number"
        className={`w-full border border-gray-400 text-center py-2 text-lg bg-transparent font-[300] ${
          inputClass ? inputClass : ""
        }`}
        value={currQty}
        id="qty"
        onChange={changeHandler}
      />

      <div
        className={iconClass}
        onClick={() => setQty((c) => (c < 2 ? 1 : c - 1))}
      >
        <AiOutlineMinus />
      </div>
    </div>
  );
}
