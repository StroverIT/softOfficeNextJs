import React from "react";
import { useState } from "react";
// Icons
import { GiShoppingBag } from "react-icons/gi";
import { AiOutlineCar } from "react-icons/ai";

function IconType({ icon }) {
  let type;
  switch (icon) {
    case "shop":
      type = <GiShoppingBag />;
      break;
    case "address":
      type = <AiOutlineCar />;
      break;
  }
  return <div>{type}</div>;
}
export default function RadioButton({
  changeHandler,
  radioState,
  name,
  id,
  text,
  customLabelClass,
  icon,
  onClick,
}) {
  return (
    <div className="relative form-check " onClick={onClick}>
      <input
        className={` float-left w-3 h-3 mt-1 mr-2 align-top transition duration-200 bg-white bg-center bg-no-repeat bg-contain border  rounded-full appearance-none cursor-pointer form-check-input checked:bg-primary checked:border-primary focus:outline-none border-gray `}
        type="radio"
        name={name}
        id={id}
        checked={radioState == name ? true : false}
        onChange={changeHandler}
      />
      <label
        className={`inline-block font-normal text-gray-800 cursor-pointer select-none form-check-label ${customLabelClass} flex `}
        htmlFor={id}
      >
        <div className="pr-1 my-auto text-xl font-bold">
          <IconType icon={icon} />
        </div>

        <div>{text}</div>
      </label>
    </div>
  );
}
