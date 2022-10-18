import React from "react";
// Icons
import { HiX } from "react-icons/hi";
// Components
import Price from "../priceStyling/Pricing";
import QunityInput from "../base/QuanityInput";

export default function MobileScreenTableData({
  price,
  qty,
  removeProduct,
  changeQty,
}) {
  let newTotalPrice = (price.fixedPrice * qty).toFixed(2).split(".");
  let newPrice = price.fixedPrice.toFixed(2).split(".");

  if (price.promotionalPrice) {
    newPrice = price.promotionalPrice.toFixed(2).split(".");
    newTotalPrice = (price.promotionalPrice * qty).toFixed(2).split(".");
  }
  return (
    <td className="flex flex-col justify-center w-full mt-5 lg:hidden">
      <div className="flex items-center justify-center my-1 ">
        <div className="lg:px-3 flex flex-col sm:items-start sm:-mb-[3rem] sm:mx-auto sm:ml-2 w-full">
          <div className="text-sm text-center text-gray-250 ">Ед. цена</div>
          <Price price={newPrice[0]} priceDec={newPrice[1]} size="2xl" />
        </div>

        <div className="lg:px-3 flex flex-col sm:items-end sm:-mb-[3rem] sm:mx-auto sm:mr-2 w-full">
          <div className="text-sm text-center text-gray-250 ">Общо</div>
          <Price
            price={newTotalPrice[0]}
            priceDec={newTotalPrice[1]}
            size="2xl"
          />
        </div>
      </div>
      <div>
        <QunityInput
          contClass="w-1/2 mx-auto mt-2 lg:mt-10"
          cartQty={qty}
          changeQty={changeQty}
        />
        <div className="flex items-center justify-center mt-2 ">
          <div
            type="button"
            className="flex items-center justify-center cursor-pointer text-gray-darker"
          >
            <div className="mt-[0.25px]">
              <HiX />
            </div>
            <button type="button" onClick={removeProduct}>
              Премахни
            </button>
          </div>
        </div>
      </div>
    </td>
  );
}
