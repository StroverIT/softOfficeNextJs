import React, { useRef } from "react";
import { useState, useEffect } from "react";

export default function Checkbox({
  text,
  id,
  checked,
  setChecked,
  size = "4",
}) {
  const inputRef = useRef(null);
  const handler = (e) => {
    setChecked(inputRef, e);
  };
  return (
    <div className="form-check ">
      <input
        className={`float-left w-${size} h-${size} mt-1 mr-2 align-top transition duration-200 bg-white bg-center bg-no-repeat bg-contain border rounded-sm appearance-none cursor-pointer form-check-input checked:bg-primary checked:border-primary focus:outline-none border-gray`}
        type="checkbox"
        id={id}
        checked={checked}
        ref={inputRef}
        onChange={handler}
        value="option1"
        data-type={id}
      />
      <label
        className="inline-block font-normal text-gray-800 cursor-pointer select-none form-check-label"
        htmlFor={id}
      >
        {text}
      </label>
    </div>
  );
}
