import { useEffect, useState, useRef } from "react";

// Get data from the user and fullfil in inputplaceholder
const AccInput = ({
  placeholder,
  id,
  value,
  onChange,
  readOnly = null,
  phoneNumber,
}) => {
  const [telephone, setTelephone] = useState("");
  const inputField = useRef(null);

  const replaceVal = (val) => {
    return val.replace(/\W/gi, "").replace(/(.{3})/g, "$1 ");
  };
  const changeHandler = (e) => {
    const val = e.target.value;

    if (val.replace(/\W/gi, "").length > 10) return;
    setTelephone(replaceVal(val));
  };
  useEffect(() => {
    const val = phoneNumber?.toString();
    setTelephone(replaceVal(val));
  }, [phoneNumber]);
  return (
    <div className="w-full ">
      <div className="relative mb-4 border border-gray">
        <input
          className="w-full px-3 py-3 leading-tight text-gray-700 rounded appearance-none pl-14 focus:outline-none focus:shadow-outline placeholder:text-gray-200 text-dark caret-dark"
          value={telephone}
          id={id}
          name={id}
          type="text"
          ref={inputField}
          onChange={changeHandler}
        />
        <label
          htmlFor={id}
          className="absolute px-1 text-xs bg-white -top-2 left-2 text-gray-450"
        >
          {placeholder}
        </label>
        <div className="absolute -translate-y-1/2 top-1/2 left-4">+359</div>
      </div>
    </div>
  );
};

export default AccInput;
