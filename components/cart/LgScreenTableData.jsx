import React from "react";
// Icons
import { HiX } from "react-icons/hi";
// Components
import Price from "../priceStyling/Pricing";
import QunityInput from "../base/QuanityInput";
import TableData from "./TableData";
export default function LgScreenTableData({
  price,
  qty,
  removeProduct,
  changeQty,
}) {
  let newTotalPrice, newPrice;
  if (price.fixedPrice || price.fixedPrice == 0) {
    newPrice = parseFloat(price?.fixedPrice)?.toFixed(2)?.split(".");
    newTotalPrice = (parseFloat(price?.fixedPrice) * qty)
      ?.toFixed(2)
      ?.split(".");
  }
  if (price.promotionalPrice) {
    newPrice = parseFloat(price.promotionalPrice).toFixed(2).split(".");
    newTotalPrice = (parseFloat(price.promotionalPrice) * qty)
      .toFixed(2)
      .split(".");
  }
  return (
    <>
      <TableData classes="lg:px-3 hidden lg:table-cell">
        <Price price={newPrice[0]} priceDec={newPrice[1]} size="2xl" />
      </TableData>
      <TableData classes="hidden lg:table-cell">
        <QunityInput
          contClass="w-1/2 mx-auto mt-2 lg:mt-10"
          cartQty={qty}
          changeQty={changeQty}
        />
        <div className="flex items-center justify-center mt-2">
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
      </TableData>
      <TableData classes=" lg:px-3 hidden lg:table-cell">
        <Price
          price={newTotalPrice[0]}
          priceDec={newTotalPrice[1]}
          size="2xl"
        />
      </TableData>
    </>
  );
}
