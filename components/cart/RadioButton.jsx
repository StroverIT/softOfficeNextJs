import React from "react";
import { useState } from "react";

import { DELIVERY, MAGAZINE } from "./cartCostants";

export default function RadioButton({ price, changeHandler, radioState }) {
  // const data = e.target.dataset.type;
  // const isChecked = e.target.checked;

  return (
    <div>
      <div className="form-check ">
        <input
          className="float-left w-4 h-4 mt-1 mr-2 align-top transition duration-200 bg-white bg-center bg-no-repeat bg-contain border rounded-full appearance-none cursor-pointer form-check-input checked:bg-primary checked:border-primary focus:outline-none border-gray"
          type="radio"
          name={MAGAZINE}
          id="fromMagazine"
          checked={radioState == MAGAZINE ? true : false}
          onChange={changeHandler}
        />
        <label
          className="inline-block font-normal text-gray-800 cursor-pointer select-none form-check-label"
          htmlFor="fromMagazine"
        >
          Вземи от магазин
        </label>
      </div>
      <div className="form-check ">
        <input
          className="float-left w-4 h-4 mt-1 mr-2 align-top transition duration-200 bg-white bg-center bg-contain border rounded-full appearance-none cursor-pointer bg-no-repe at form-check-input checked:bg-primary checked:border-primary focus:outline-none border-gray "
          type="radio"
          name={DELIVERY}
          id="delivery"
          checked={radioState == DELIVERY ? true : false}
          onChange={changeHandler}
        />
        <label
          className="inline-block font-normal text-gray-800 cursor-pointer select-none form-check-label"
          htmlFor="delivery"
        >
          Доставка до вкъщи
        </label>
      </div>
    </div>
  );
}
