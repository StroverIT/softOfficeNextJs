// React
import React from "react";

import Pricing from "./Pricing";
<<<<<<< HEAD
import OldPrice from "./OldPrice";

const PricePromo = ({ price, promoPrice }) => {
  const oldPrice = parseFloat(price).toFixed(2).split(".");
  const promoPriceDec = parseFloat(promoPrice).toFixed(2).split(".");
  return (
    <div className="w-full border-t border-gray">
      <div className="flex justify-between ">
        <div className="flex items-center ml-5 text-xs font-medium text-gray-200">
          Цената е без ДДС
        </div>
        <div
          className={`flex  items-center  px-2 text-white bg-gray-400 justify-between gap-x-5 gap-y-5`}
        >
          <div className="text-gray-500 ">
            <OldPrice
              price={oldPrice[0]}
              priceDec={oldPrice[1]}
              size="xl"
              textColor="text-white"
              NoDDSText={true}
            />
          </div>
          <div className="text-primary-100">
            <Pricing
              price={promoPriceDec[0]}
              priceDec={promoPriceDec[1]}
              size="2xl"
              textColor="text-white"
              NoDDSText={true}
            />
          </div>
=======

const PricePromo = ({ isPromo, price, priceDec }) => {
  return (
    <div className="w-full border-t border-gray">
      <div className="flex justify-between ">
        <div className="flex items-center ml-5 text-xs font-medium">
          Цената е без ДДС
        </div>
        <div
          className={` inline-flex items-center justify-center   text-white  px-2 ${
            !isPromo ? "bg-primary" : " bg-secondary"
          }`}
        >
          <Pricing
            price={price}
            priceDec={priceDec}
            size="xl"
            textColor="text-white"
            NoDDSText={true}
          />
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
        </div>
      </div>
    </div>
  );
};

export default PricePromo;
