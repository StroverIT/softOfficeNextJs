import React from "react";
// Icons
import { HiX } from "react-icons/hi";
// Components
import Price from "../priceStyling/Pricing";
<<<<<<< HEAD
import OldPrice from "../priceStyling/OldPrice";

=======
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
import QunityInput from "../base/QuanityInput";
import TableData from "./TableData";
export default function LgScreenTableData({
  price,
  qty,
  removeProduct,
  changeQty,
}) {
<<<<<<< HEAD
  let totalPrice = (price.fixedPrice * qty).toFixed(2).split(".");
=======
  let totalPrice = (price * qty).toFixed(2).split(".");
  price = price.toFixed(2).split(".");
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e

  return (
    <>
      <TableData classes="lg:px-3 hidden lg:table-cell">
<<<<<<< HEAD
        {!price.promotionalPrice && (
          <Price price={totalPrice[0]} priceDec={totalPrice[1]} size="2xl" />
        )}
        {price.promotionalPrice && (
          <div>
            <div className="text-gray-200">
              <OldPrice
                price={parseFloat(price.fixedPrice).toFixed(2).split(".")[0]}
                priceDec={parseFloat(price.fixedPrice).toFixed(2).split(".")[1]}
                size="xl"
                NoDDSText={true}
              />
            </div>
            <Price
              price={
                parseFloat(price.promotionalPrice).toFixed(2).split(".")[0]
              }
              priceDec={
                parseFloat(price.promotionalPrice).toFixed(2).split(".")[1]
              }
              size="2xl"
            />
          </div>
        )}
      </TableData>
      <TableData classes="hidden lg:table-cell">
        <QunityInput
          contClass="w-1/2 mx-auto mt-2"
=======
        <Price price={price[0]} priceDec={price[1]} size="2xl" />
      </TableData>
      <TableData classes="hidden lg:table-cell">
        <QunityInput
          contClass="w-1/2 mx-auto mt-2 lg:mt-10"
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
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
<<<<<<< HEAD
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
=======
        <Price price={totalPrice[0]} priceDec={totalPrice[1]} size="2xl" />
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
      </TableData>
    </>
  );
}
