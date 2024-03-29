import React from "react";

import Icons from "../Icons/Icons";

// Get data from the user and fullfil in inputplaceholder
const AccInput = ({
  type,
  placeholder,
  id,
  isReq,
  iconType,
  defValue,
  value,
  onChange,
  inputRef
}) => {
  return (
    <div className="w-full">
      <div className="mb-4">
        <label
          className="block mb-1 text-sm font-semibold text-gray-700"
          htmlFor="username"
        >
          {placeholder}
        </label>
        <div>
          <input
          ref={inputRef}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline placeholder:text-gray-200"
            id={id}
            name={id}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};

export default AccInput;
