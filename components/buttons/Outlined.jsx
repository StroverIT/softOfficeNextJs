import React from "react";

export default function Outlined({
  type,
  text,
  custom,
  isDisabled,
  name,
  onClick,
<<<<<<< HEAD
  isLoading,
  id,
=======
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
}) {
  return (
    <button
      type={type}
      disabled={isDisabled}
<<<<<<< HEAD
      id={id}
      name={name}
      onClick={onClick}
      className={`w-full py-2 font-medium text-white uppercase transition-colors duration-100 border px-14 bg-primary hover:bg-transparent hover:text-primary border-primary flex items-center justify-center ${
        custom ? custom : ""
      }`}
    >
      {isLoading ? <div className="loader"></div> : text}
=======
      name={name}
      onClick={onClick}
      className={`w-full py-2 font-medium text-white uppercase transition-colors duration-100 border px-14 bg-primary hover:bg-transparent hover:text-primary border-primary ${
        custom ? custom : ""
      }`}
    >
      {text}
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
    </button>
  );
}
