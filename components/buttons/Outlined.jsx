import React from "react";

export default function Outlined({
  type,
  text,
  custom,
  isDisabled,
  name,
  onClick,
  isLoading,
  id,
}) {
  return (
    <button
      type={type}
      disabled={isDisabled}
      id={id}
      name={name}
      onClick={onClick}
      className={`w-full py-2 font-medium text-white uppercase transition-colors duration-100 border px-14 bg-primary hover:bg-transparent hover:text-primary border-primary flex items-center justify-center ${
        custom ? custom : ""
      }`}
    >
      {isLoading ? <div className="loader"></div> : text}
    </button>
  );
}
