import React, { useState } from "react";
import ListBox from "../base/ListBox";

const PriceWithQuantity = ({ selected, setSelected, data }) => {
  const formatedData = data?.map((item) => {
    return {
      name: `${item.quantity} броя - ${item.price} лв.`,
      price: item.price,
      qty: item.quantity,
    };
  });
  return (
    <div className="w-full">
      <ListBox
        selected={selected}
        setSelected={setSelected}
        data={formatedData}
      />
    </div>
  );
};

export default PriceWithQuantity;
