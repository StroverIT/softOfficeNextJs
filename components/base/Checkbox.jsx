import React from "react";
import { useState } from "react";

export default function Checkbox({ text, quantity, id, setChecked, checked }) {
  return (
    <div className="form-check ">
      <input
        className="float-left w-4 h-4 mt-1 mr-2 align-top transition duration-200 bg-white bg-center bg-no-repeat bg-contain border border-gray-300 rounded-sm appearance-none cursor-pointer form-check-input checked:bg-primary checked:border-primary focus:outline-none border-gray"
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        value="option1"
        data-type={id}
      />
      <label
        className="inline-block font-normal text-gray-800 select-none form-check-label cursor-pointer"
        htmlFor={id}
      >
        {text}
        {quantity && <span className="pl-1 text-[#aaa]">({quantity})</span>}
      </label>
    </div>
  );
}
