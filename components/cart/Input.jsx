import React from "react";

function Input({ id, text, type, holder, value, handler }) {
  return (
    <div className="flex flex-col justify-between mb-2 lg:mb-0 lg:flex-row">
      <div className="flex items-center ">
        <label htmlFor={id} className="font-medium text-dark-400">
          {text}
        </label>
      </div>
      <input
        type={type}
        id={id}
        name={id}
        className="px-3 py-2 my-1 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline placeholder:text-gray-200"
        value={value}
        placeholder={holder}
        onChange={handler}
      />
    </div>
  );
}

export default Input;
