import React, { useState } from "react";
// Components
import Input from "../../../form/AccInput";
import CheckBox from "../../../base/CheckBoxBase";

const PersonalPromoList = ({
  product,
  index,
  setCheckedProducts,
  checkedProducts,
}) => {
  const promoHandler = (e) => {
    if (e.target.value.length > 2) return;
    const changedChacked = checkedProducts.map((product, productIdx) => {
      if (productIdx == index) {
        return { ...product, customPromo: e.target.value, isSelected: true };
      }
      return product;
    });
    setCheckedProducts(changedChacked);
  };

  const checkedHandler = (input, e) => {
    const changedChacked = checkedProducts.map((product, productIdx) => {
      if (productIdx == index) {
        return { ...product, isSelected: !product.isSelected };
      }
      return product;
    });
    setCheckedProducts(changedChacked);
  };

  return (
    <tr>
      <td className="">{index}</td>
      <td>
        <div className="ml-4">
          <CheckBox
            checked={product.isSelected}
            setChecked={checkedHandler}
            id={product._id}
            size="7"
          />
        </div>
      </td>
      <td className="relative ">
        <div className="w-[45px] text-center ml-10 w-">
          <Input
            id="promo"
            type="text"
            isReq={false}
            value={product.customPromo}
            onChange={promoHandler}
          />
          <div className="absolute text-lg font-semibold left-24 top-2">%</div>
        </div>
      </td>
      <td className="">
        {product.nameToDisplay}_{product.name}
      </td>
    </tr>
  );
};

export default PersonalPromoList;
