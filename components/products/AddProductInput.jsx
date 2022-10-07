import React, { useState, useEffect } from "react";
// Icons
<<<<<<< HEAD
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const iconClass =
  "cursor-pointer h-full border-gray-400 border py-3 px-4 text-lg font-bold select-none";
=======
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e

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
<<<<<<< HEAD
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
=======

  return (
    <div className={`relative ${contClass ? contClass : ""}`}>
      <input
        type="number"
        className={`w-full border border-l pl-4  border-primary py-[0.3rem] placeholder:text-sm placeholder:font-default placeholder:text-[#808080] placeholder:absolute placeholder:left-2 placeholder:top-1/2 placeholder:-translate-y-1/2 ${
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
          inputClass ? inputClass : ""
        }`}
        value={currQty}
        id="qty"
        onChange={changeHandler}
      />
<<<<<<< HEAD

      <div
        className={iconClass}
        onClick={() => setQty((c) => (c < 2 ? 1 : c - 1))}
      >
        <AiOutlineMinus />
=======
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
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
      </div>
    </div>
  );
}
