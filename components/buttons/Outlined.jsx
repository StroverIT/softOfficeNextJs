import React from "react";

export default function Outlined({ type, text, custom, isDisabled, name }) {
  return (
    <button
      type={type}
      disabled={isDisabled}
      name={name}
      className={`w-full py-2 font-medium text-white uppercase transition-colors duration-100 border px-14 bg-primary hover:bg-transparent hover:text-primary border-primary ${
        custom ? custom : ""
      }`}
    >
      {text}
    </button>
  );
}
