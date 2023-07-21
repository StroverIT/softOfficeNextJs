import React from "react";

function Input({ id, text, type, holder, value, handler }) {
  return (
    <div className="">
    <label className="relative cursor-pointer">
      <input
        type={type}
        name={id}
    
        id="inputGoogle"

        value={value}
        onChange={handler}
        placeholder={holder}
        className=" w-full  px-6 py-2 xl:text-lg text-black placeholder-opacity-0 transition duration-200 border-2 border-opacity-50 rounded-lg outline-none placeholder-blue-50 border-[#dadce0] focus:border-blue-50"
      />
      <span className="absolute px-1 transition duration-200 bg-white xl:text-lg -top-1 text-dark text-opacity-80 left-5 input-text">
        {text}
      </span>
    </label>
    </div>
  );
}

export default Input;



{/* <div className="flex flex-col  mb-2 lg:mb-0 lg:flex-row">
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
</div> */}