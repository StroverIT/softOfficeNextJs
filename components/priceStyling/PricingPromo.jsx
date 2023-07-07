// React
import React from "react";

import Pricing from "./Pricing";
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
              size="2xl"
              textColor="text-white"
              NoDDSText={true}
            />
          </div>
          <div className="text-primary-100">
            <Pricing
              price={promoPriceDec[0]}
              priceDec={promoPriceDec[1]}
              size="3xl"
              textColor="text-white"
              NoDDSText={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricePromo;
