import React from "react";

// Components
import ImageAndListTableData from "./ImageAndListTableData";
import LgScreenTableData from "./LgScreenTableData";
import MobileScreenTableData from "./MobileScreenTableData";
// Translator
import { translationToRoute } from "../../utils/translationToRoute";

export default function CartItem({ cartData, removeProduct, changeQty }) {
  const route = `/products/${translationToRoute(cartData.item.sectionName)}/${
    cartData.item._id
  }`;
  return (
    <tr className="border-b border-gray-[#e4e7e6] flex flex-wrap lg:table-row justify-between items-center pb-3 mb-3">
      {/* Image plus list */}
      <ImageAndListTableData
        listData={cartData?.item.types[0].split("\n")}
        cartName={cartData?.item.articleName}
        route={route}
      />
      {/* MObile version */}
      <MobileScreenTableData
        price={cartData?.item.price}
        qty={cartData?.qty}
        removeProduct={removeProduct}
        changeQty={changeQty}
      />
      {/* Large screen version */}
      <LgScreenTableData
        price={cartData?.item.price}
        qty={cartData?.qty}
        removeProduct={removeProduct}
        changeQty={changeQty}
      />
    </tr>
  );
}
