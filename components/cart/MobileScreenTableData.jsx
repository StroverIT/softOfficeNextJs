import React from "react";
// Icons
import { HiX } from "react-icons/hi";
// Components
import Price from "../priceStyling/Pricing";
import QunityInput from "../base/QuanityInput";
import OldPrice from "../priceStyling/OldPrice";

export default function MobileScreenTableData({
  price,
  qty,
  removeProduct,
  changeQty,
}) {
  let newPrice, newTotalPrice, promoPrice, promoPriceTotal;

  if (price.fixedPrice || price.fixedPrice == 0) {
    newPrice = parseFloat(price?.fixedPrice)?.toFixed(2)?.split(".");
    newTotalPrice = (parseFloat(price?.fixedPrice) * qty)
      ?.toFixed(2)
      ?.split(".");
  }
  if (price.promotionalPrice) {
    promoPrice = parseFloat(price.promotionalPrice).toFixed(2).split(".");
    promoPriceTotal = (parseFloat(price.promotionalPrice) * qty)
      .toFixed(2)
      .split(".");
  }
  return (
    <td className="flex flex-col justify-center w-full lg:hidden">
      <div className="flex items-center justify-center my-1 ">
        <div className="lg:px-3 flex flex-col sm:items-start sm:-mb-[3rem] sm:mx-auto sm:ml-2 w-full">
          <div className="text-sm text-center text-gray-250 ">Ед. цена</div>
          {promoPrice && (
            <>
              <section className="text-gray-200">
                <OldPrice
                  price={newPrice[0]}
                  priceDec={newPrice[1]}
                  size="2xl"
                  NoDDSText={true}
                />
              </section>
              <Price
                price={promoPrice[0]}
                priceDec={promoPrice[1]}
                size="3xl"
              />
            </>
          )}
          {!promoPrice && (
            <>
              <Price
                price={newPrice[0]}
                priceDec={newPrice[1]}
                size="3xl"
              />
            </>
          )}
        </div>

        <div className="lg:px-3 flex flex-col sm:items-end sm:-mb-[3rem] sm:mx-auto sm:mr-2 w-full">
          <div className="text-sm text-center text-gray-250 ">Общо</div>
          {promoPrice && (
            <>
              <section className="text-gray-200">
                <OldPrice
                  price={newTotalPrice[0]}
                  priceDec={newTotalPrice[1]}
                  size="2xl"
                  NoDDSText={true}
                />
              </section>
              <Price
                price={promoPriceTotal[0]}
                priceDec={promoPriceTotal[1]}
                size="3xl"
              />
            </>
          )}
          {!promoPrice && (
            <>
              <Price
                price={newTotalPrice[0]}
                priceDec={newTotalPrice[1]}
                size="3xl"
              />
            </>
          )}
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
            className="flex items-center justify-center cursor-pointer text-red"
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
