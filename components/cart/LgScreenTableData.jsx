import React from "react";
// Icons
import { HiX } from "react-icons/hi";
// Components
import Price from "../priceStyling/Pricing";
import OldPrice from "../priceStyling/OldPrice";

import QunityInput from "../base/QuanityInput";
import TableData from "./TableData";
export default function LgScreenTableData({
  price,
  qty,
  removeProduct,
  changeQty,
}) {
  let totalPrice = (price.fixedPrice * qty).toFixed(2).split(".");

  return (
    <>
      <TableData classes="lg:px-3 hidden lg:table-cell">
        {!price.promotionalPrice && (
          <Price price={totalPrice[0]} priceDec={totalPrice[1]} size="2xl" />
        )}
        {price.promotionalPrice && (
          <div>
            <div className="text-gray-200">
              <OldPrice
                price={price.fixedPrice.toFixed(2).split(".")[0]}
                priceDec={price.fixedPrice.toFixed(2).split(".")[1]}
                size="xl"
                NoDDSText={true}
              />
            </div>
            <Price
              price={price.promotionalPrice.toFixed(2).split(".")[0]}
              priceDec={price.promotionalPrice.toFixed(2).split(".")[1]}
              size="2xl"
            />
          </div>
        )}
      </TableData>
      <TableData classes="hidden lg:table-cell">
        <QunityInput
          contClass="w-1/2 mx-auto mt-2"
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
        {!price.promotionalPrice && (
          <Price price={totalPrice[0]} priceDec={totalPrice[1]} size="2xl" />
        )}
        {price.promotionalPrice && (
          <div>
            <div className="text-gray-200">
              <OldPrice
                price={totalPrice[0]}
                priceDec={totalPrice[1]}
                size="xl"
                NoDDSText={true}
              />
            </div>
            <Price
              price={(price.promotionalPrice * qty).toFixed(2).split(".")[0]}
              priceDec={(price.promotionalPrice * qty).toFixed(2).split(".")[1]}
              size="2xl"
            />
          </div>
        )}
      </TableData>
    </>
  );
}
