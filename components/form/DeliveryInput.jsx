import React from "react";

import Icons from "../Icons/Icons";

// Get data from the user and fullfil in inputplaceholder
const AccInput = ({
  type,
  placeholder,
  id,

  defValue,
  value,
  onChange,
  readOnly = null,
}) => {
  return (
    <div className="w-full ">
      <div className="mb-4 relative border border-gray">
        <input
          className="w-full px-3 py-3 leading-tight text-gray-700  rounded  appearance-none focus:outline-none focus:shadow-outline placeholder:text-gray-200"
          id={id}
          name={id}
          type={type}
          value={value}
          defaultValue={defValue}
          onChange={onChange}
          readOnly={readOnly && "readOnly"}
        />
        <div className="absolute -top-2 bg-white px-1 left-2 text-xs text-gray-450">
          {placeholder}
        </div>
      </div>
    </div>
  );
};

export default AccInput;
