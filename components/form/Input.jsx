import React from "react";

import Icons from "../Icons/Icons";

<<<<<<< HEAD
const Input = ({ type, placeholder, id, isReq, iconType, val, onChange }) => {
=======
const Input = ({ type, placeholder, id, isReq, iconType, val }) => {
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
  return (
    <div className="relative mb-5">
      <div className="absolute left-0 z-10 top-2.5 text-lg">
        <Icons iconType={iconType} />
      </div>
      <input
        className="w-full px-6 py-2 leading-tight placeholder-transparent border-b appearance-none placeholder:pl-10 peer text-gray-darker focus:outline-none focus:shadow-outline"
        id={id}
        type={type}
        placeholder={placeholder}
        required={isReq}
        name={id}
        val={val}
<<<<<<< HEAD
        onChange={onChange}
=======
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
      />
      <label
        className="absolute   -top-3.5 left-0 block mb-2 text-sm  text-gray-darker peer-placeholder-shown:text-base peer-placeholder-shown:px-6  peer-placeholder-shown:top-1.5 transition-all duration-300"
        htmlFor={id}
      >
        {placeholder}
      </label>
    </div>
  );
};

export default Input;
