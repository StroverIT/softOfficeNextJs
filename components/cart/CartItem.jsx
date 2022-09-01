import React from "react";

// Components
import ImageAndListTableData from "./ImageAndListTableData";
import LgScreenTableData from "./LgScreenTableData";
import MobileScreenTableData from "./MobileScreenTableData";

export default function CartItem({ cartData, removeProduct, changeQty }) {
  let route;
  if (cartData.item.item.itemsLen == 1) {
    route = `/products/${cartData.item.section.route}/${cartData.item.article.route}`;
  } else {
    route = `/products/${cartData.item.section.route}/${cartData.item.article.route}#${cartData.item.item.route}`;
  }
  const name = `${cartData?.item?.section?.name} ${cartData?.item?.article?.name} `;
  return (
    <tr className="border-b border-gray-[#e4e7e6] flex flex-wrap lg:table-row justify-between items-center py-10 mb-10 gap-10 ">
      {/* Image plus list */}
      <ImageAndListTableData
        cartName={name}
        route={route}
        imageUrl={cartData?.item?.article?.imgUrl}
      />
      {/* MObile version */}
      <MobileScreenTableData
        price={cartData?.item?.item?.cena}
        qty={cartData?.qty}
        removeProduct={removeProduct}
        changeQty={changeQty}
      />
      {/* Large screen version */}
      <LgScreenTableData
        price={cartData?.item?.item?.cena}
        qty={cartData?.qty}
        removeProduct={removeProduct}
        changeQty={changeQty}
      />
    </tr>
  );
}
