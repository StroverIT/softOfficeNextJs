// React
import React from "react";

import Pricing from "./Pricing";

const PricePromo = ({ isPromo, price, priceDec }) => {
  return (
    <div className="w-full border-t border-gray">
      <div className="flex justify-end ">
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
        </div>
      </div>
    </div>
  );
};

export default PricePromo;
